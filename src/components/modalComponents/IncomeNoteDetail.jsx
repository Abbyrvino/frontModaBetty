import React, { useState } from 'react';
import { Modal, Table, Button, Space, Input, Select, DatePicker } from 'antd';
import dayjs from 'dayjs';
/**para hacer reporte solo de lo que se muestra en pantalla */
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Inventarios, Providers } from '../../utils/test';

const IncomeNoteDetail = ({ visible, onClose, note }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [descripcion, setDescripcion] = useState(note ? note.descripcion : '');
    const [fecha, setFecha] = useState(note ? dayjs(note.fecha) : null);
    const [productos, setProductos] = useState(note ? note.detalleIngreso.map(item => ({
        id: item.inventario.id,
        cantidad: item.cantidad,
        precio: item.precio
    })) : [{ id: '', cantidad: '', precio: '' }]);
    const [proveedor, setSelectedProvider] = useState(note ? note.proveedor : null);

    const columns = [
        {
            title: (<div>Producto</div>),
            dataIndex: 'id',
            render: (value, record, index) =>
                !isEditing ? (
                    <span>{record.inventario.producto.nombre}</span>
                ) : (
                    <Select
                        placeholder="Producto"
                        style={{ width: 200 }}
                        onChange={(value) => handleProductChange(index, value)}
                        value={value}
                    >
                        {Inventarios.map((inv) => (
                            <Select.Option key={inv.producto.id} value={inv.producto.id}>
                                {inv.producto.nombre}
                            </Select.Option>
                        ))}
                    </Select>
                ),
        },
        {
            title: (<div>Cantidad</div>),
            dataIndex: 'cantidad',
            render: (value, record, index) =>
                !isEditing ? (
                    <span>{value}</span>
                ) : (
                    <Input
                        value={value}
                        onChange={(e) => handleQuantityChange(index, e)}
                        style={{ width: 100 }}
                    />
                ),
        },
        {
            title: (<div>Precio</div>),
            dataIndex: 'precio',
            render: (value, record, index) =>
                !isEditing ? (
                    <span>{value}</span>
                ) : (
                    <Input
                        value={value}
                        onChange={(e) => handlePriceChange(index, e)}
                        style={{ width: 100 }}
                    />
                ),
        },
        {
            dataIndex: 'action',
            render: (text, record, index) =>
                isEditing && (
                    <Button type="danger" onClick={() => removeProductRow(index)}>X</Button>
                ),
        },
    ];

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        const formattedDate = dayjs(fecha).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
        const newIngreso = {
            id: note.id,
            descripcion,
            fecha: formattedDate,
            proveedor,
            detalleIngreso: productos.map(producto => ({
                cantidad: parseInt(producto.cantidad, 10),
                precio: parseFloat(producto.precio),
                inventario: { id: producto.id }
            }))
        };
        console.log("Datos guardados:", newIngreso);
        setIsEditing(false);
        setDescripcion(note.descripcion);
        setFecha(dayjs(note.fecha));
        setProductos(note.detalleIngreso.map(item => ({
            id: item.inventario.id,
            cantidad: item.cantidad,
            precio: item.precio
        })));
        setSelectedProvider(note.proveedor);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        setDescripcion(note.descripcion);
        setFecha(dayjs(note.fecha));
        setProductos(note.detalleIngreso.map(item => ({
            id: item.inventario.id,
            cantidad: item.cantidad,
            precio: item.precio
        })));
        setSelectedProvider(note.proveedor);
    };

    const handleChangeDescripcion = (e) => {
        setDescripcion(e.target.value);
    };

    const handleChangeFecha = (value) => {
        setFecha(value);
    };

    const handleProductChange = (index, value) => {
        const newProductos = [...productos];
        newProductos[index].id = value;
        setProductos(newProductos);
    };

    const handleQuantityChange = (index, e) => {
        const newProductos = [...productos];
        newProductos[index].cantidad = e.target.value;
        setProductos(newProductos);
    };

    const handlePriceChange = (index, e) => {
        const newProductos = [...productos];
        newProductos[index].precio = e.target.value;
        setProductos(newProductos);
    };

    const handleChangeProvider = (value) => {
        setSelectedProvider(value);
    };

    const addProductRow = () => {
        setProductos([...productos, { id: '', cantidad: '', precio: '' }]);
    };

    const removeProductRow = (index) => {
        const newProductos = productos.filter((_, i) => i !== index);
        setProductos(newProductos);
    };
//aqui se genera el reporte
    const generatePdf = () => {
        const doc = new jsPDF();
        doc.text("Detalle de Nota de Ingreso", 20, 10);

        doc.text(`ID: ${note.id}`, 20, 20);
        doc.text(`Descripción: ${note.descripcion}`, 20, 30);
        doc.text(`Proveedor: ${note.proveedor}`, 20, 40);
        doc.text(`Fecha: ${note.fecha}`, 20, 50);

        const tableColumn = ["Producto", "Cantidad", "Precio"];
        const tableRows = [];

        note.detalleIngreso.forEach(item => {
            const productoData = [
                item.inventario.producto.nombre,
                item.cantidad,
                item.precio
            ];
            tableRows.push(productoData);
        });

        doc.autoTable(tableColumn, tableRows, { startY: 60 });

        doc.save('reporte.pdf');
    };

    return (
        <Modal
            title="Detalle de Nota de Ingreso"
            open={isModalOpen}
            onCancel={onClose}
            footer={null}
            centered
        >
            {note ? (
                <>
                    {!isEditing ? (
                        <>
                            <p className="flex items-center mb-3"><strong className="mr-3">ID:</strong> {note.id}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Descripción:</strong> {note.descripcion}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Proveedor:</strong> {note.proveedor}</p>
                            <p className="flex items-center mb-3"><strong className="mr-3">Fecha:</strong> {note.fecha}</p>
                            <Table
                                scroll={{ x: 'max-content' }}
                                columns={columns}
                                dataSource={note.detalleIngreso}
                                rowKey={(record) => `${record.inventario.nombre}-${record.cantidad}`}
                                pagination={false}
                            />
                            <Button className="w-full font-bold" onClick={handleEditClick} style={{ marginTop: '16px' }}>Editar</Button>
                            <Button className="w-full font-bold" onClick={generatePdf} style={{ marginTop: '16px' }}>Generar PDF</Button>
                        </>
                    ) : (
                        <>
                            <p className="flex items-center mb-1"><strong className="mr-3">ID:</strong> {note.id}</p>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Descripción:</strong></p>
                                <Input
                                    placeholder="Descripción"
                                    value={descripcion}
                                    onChange={handleChangeDescripcion}
                                />
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Proveedor:</strong></p>
                                <Select
                                    placeholder="Proveedor"
                                    className="w-full"
                                    onChange={handleChangeProvider}
                                    value={proveedor}
                                >
                                    {Providers.map((prov) => (
                                        <Select.Option key={prov.id} value={prov.id}>
                                            {prov.nombre}
                                        </Select.Option>
                                    ))}
                                </Select>
                            </div>
                            <div className="flex items-center mb-1">
                                <p className="mr-3"><strong>Fecha:</strong></p>
                                <DatePicker
                                    placeholder="Fecha"
                                    className="w-full"
                                    onChange={handleChangeFecha}
                                    value={fecha}
                                />
                            </div>
                            <Table
                                scroll={{ x: 'max-content' }}
                                columns={columns}
                                dataSource={productos}
                                rowKey={(record, index) => index}
                                pagination={false}
                            />
                            <Button onClick={addProductRow} style={{ marginTop: 10 }}>
                                Agregar Producto
                            </Button>
                            <Space className="flex justify-end">
                                <Button type="primary" onClick={handleSaveClick}>Guardar</Button>
                                <Button onClick={handleCancelClick}>Cancelar</Button>
                            </Space>
                        </>
                    )}
                </>
            ) : (
                <p>No se encontraron detalles</p>
            )}
        </Modal>
    );
};

export default IncomeNoteDetail;
