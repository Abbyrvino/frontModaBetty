import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select, message, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { fetchInventario, fetchProviders } from '../../utils/fetchUtil';
import { createIncomeNote, saveBitacora } from '../../utils/postUtil';

const IncomeNoteModal = ({ /*products, getProducts*/ }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState(null);
    const [productos, setProductos] = useState([{ id: '', cantidad: '' }]);
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();
    const [Providers, setProviders] = useState([])
    const [Inventarios, setInventarios] = useState([])

    const getDatos = async () => {
        await fetchProviders().then((proveedor)=> setProviders(proveedor));
        await fetchInventario().then((proveedor)=> setInventarios(proveedor));
    }

    useEffect(()=>{
        getDatos();
    },[])

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!descripcion || !fecha || productos.some(producto => !producto.id || !producto.cantidad|| !producto.precio)|| !selectedProvider ) {
            error();
            return;
        } else {
            const formattedDate = dayjs(fecha).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            const newIngreso = {
                descripcion,
                fecha:formattedDate,
                proveedor: selectedProvider,
                detalleIngreso: productos.map(producto => ({
                    cantidad: parseInt(producto.cantidad, 10),
                    precio: parseFloat(producto.precio),
                    inventario: { id: producto.id }
                }))
            };
            // Enviar datos al backend
            await createIncomeNote(newIngreso);
            await saveBitacora("Creacion Nota Ingreso");
            console.log("Producto guardado:", newIngreso);
            success();

            setDescripcion('');
            setFecha(null);
            setProductos([{ id: '', cantidad: '' }]);
            setSelectedProvider(null);
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDescripcion('');
        setFecha(null);
        setProductos([{ id: '', quantity: '', precio: '' }]);
        setSelectedProvider(null);
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
        const provider = Providers.find(prov => prov.id === value);
        setSelectedProvider(provider);
    };

    const addProductRow = () => {
        setProductos([...productos, { id: '', cantidad: '' }]);
    };

    const removeProductRow = (index) => {
        const newProductos = productos.filter((_, i) => i !== index);
        setProductos(newProductos);
    };

    const success = () => {
        messageApi.success('Producto guardado exitosamente');
    };

    const error = () => {
        messageApi.error('Error, todos los campos deben ser completados');
    };

    return (
        <>
            <Button onClick={showModal}>
                Agregar Nota de Ingreso
            </Button>
            <Modal
                title="Nota de Ingreso"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Registrar Nota de Egreso"
                cancelText="Cancelar"
                okButtonProps={{ disabled: !descripcion || !fecha || productos.some(producto => !producto.id || !producto.cantidad|| !producto.precio) }}
                centered
            >
                <Input
                    placeholder="Descripcion"
                    value={descripcion}
                    onChange={handleChangeDescripcion}
                />
                <Select
                    placeholder="Proveedor"
                    style={{ width: '100%', marginTop: 10 }}
                    onChange={handleChangeProvider}
                    value={selectedProvider ? selectedProvider.id : undefined}
                >
                    {Providers ? Providers.map((prov) => (
                        <Select.Option key={prov.id} value={prov.id}>
                            {prov.nombre}
                        </Select.Option>
                    )) : <Select.Option>No hay proveedores</Select.Option>}
                </Select>
                <DatePicker
                    placeholder="Fecha"
                    style={{ width: '100%', marginTop: 10 }}
                    onChange={handleChangeFecha}
                    value={fecha}
                />
                <div>Productos</div>
                {productos.map((producto, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                        <Select
                            placeholder="Producto"
                            style={{ flex: 1, marginRight: 10 }}
                            onChange={(value) => handleProductChange(index, value)}
                            value={producto.id}
                        >
                            {Inventarios ? Inventarios.map((inv) => (
                                <Select.Option key={inv.producto.id} value={inv.producto.id}>
                                    {inv.producto.nombre}
                                </Select.Option>
                            )) : <Select.Option>No hay productos</Select.Option>}
                        </Select>
                        <Input
                            placeholder="Cantidad"
                            value={producto.cantidad}
                            onChange={(e) => handleQuantityChange(index, e)}
                            style={{ flex: 1, marginRight: 10 }}
                        />
                        <Input
                            placeholder="Precio"
                            value={producto.precio}
                            onChange={(e) => handlePriceChange(index, e)}
                            style={{ flex: 1, marginRight: 10 }}
                        />
                        <Button type="danger" onClick={() => removeProductRow(index)}>X</Button>
                    </div>
                ))}
                <Button onClick={addProductRow} style={{ marginTop: 10 }}>
                    Agregar Producto
                </Button>
                {contextHolder}
            </Modal>
        </>
    );
};

export default IncomeNoteModal;
