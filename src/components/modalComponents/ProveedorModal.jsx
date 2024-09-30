import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { createProveedor } from '../../utils/postUtil';
//import { createProveedor } from '../../utils/postUtil'; // Asegúrate de importar la función para crear proveedores

const ProveedorModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [nombre, setNombre] = useState('');
    const [numero, setNumero] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!nombre || !numero) {
            error();
            return;
        } else {
            const newProveedor = {
                nombre,
                numero,
            };
            const response = await createProveedor(newProveedor); // Llama a la función para crear proveedores
            if (response.status !== 200) {
                error();
                return;
            }
            getDatos();
            console.log("Proveedor guardado:", newProveedor);
            // Implementa la lógica para guardar el nuevo proveedor
            setNombre('');
            setNumero('');
            success();
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setNombre('');
        setNumero('');
    };

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    };

    const handleNumeroChange = (e) => {
        setNumero(e.target.value);
    };

    const success = () => {
        messageApi.success('Proveedor guardado exitosamente');
    };

    const error = () => {
        messageApi.error('Error al guardar el proveedor');
    };

    return (
        <>
            <Button className="w-full font-bold" onClick={showModal}>
                Agregar Proveedor
            </Button>
            <Modal
                title="Agregar Proveedor"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !nombre || !numero  }}
            >
                <Input
                    placeholder="Nombre del proveedor"
                    value={nombre}
                    onChange={handleNombreChange}
                    className="mb-4"
                />
                <Input
                    placeholder="numero"
                    value={numero}
                    onChange={handleNumeroChange}
                    className="mb-4"
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default ProveedorModal;
