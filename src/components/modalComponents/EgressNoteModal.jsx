import React, { useEffect, useState } from 'react';
import { Button, Modal, Input, Select, message, DatePicker } from 'antd';
import { Inventarios } from '../../utils/test';
import dayjs from 'dayjs';
import { createEgressNote, saveBitacora } from '../../utils/postUtil';
import { fetchInventario } from '../../utils/fetchUtil';

const EgressNoteModal = ({ /*products, getProducts*/ }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState(null);
    const [productos, setProductos] = useState([{ id: '', cantidad: '' }]);
    const [messageApi, contextHolder] = message.useMessage();
    const [Inventarios, setInventarios] = useState([]);

    const getDatos = async () => {
        await fetchInventario().then((inventario)=> setInventarios(inventario));
    }

    useEffect(()=>{
        getDatos();
    },[]) 

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!descripcion || !fecha || productos.some(producto => !producto.id || !producto.cantidad) ) {
            error();
            return;
        } else {
            const formattedDate = dayjs(fecha).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
            const newIngreso = {
                descripcion,
                fecha:formattedDate,
                detalleEgreso: productos.map(producto => ({
                    cantidad: parseInt(producto.cantidad, 10),
                    inventario: { id: producto.id }
                }))
            };
            // Enviar datos al backend
            await createEgressNote(newIngreso);
            await saveBitacora("Creacion egreso");
            console.log("Producto guardado para nota de egreso:", newIngreso);
            //getProducts();

            setDescripcion('');
            setFecha(null);
            setProductos([{ id: '', cantidad: '' }]);
            success();
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDescripcion('');
        setFecha(null);
        setProductos([{ id: '', quantity: '' }]);
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
                Agregar Nota de Egreso
            </Button>
            <Modal
                title="Nota de Egreso"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Registrar Nota de Egreso"
                cancelText="Cancelar"
                okButtonProps={{ disabled: !descripcion || !fecha || productos.some(producto => !producto.id || !producto.cantidad) }}
                centered
            >
                <Input
                    placeholder="Descripcion"
                    value={descripcion}
                    onChange={handleChangeDescripcion}
                />
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

export default EgressNoteModal;
