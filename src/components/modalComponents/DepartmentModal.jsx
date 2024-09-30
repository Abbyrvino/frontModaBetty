import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { createDepartment } from '../../utils/postUtil'

const DepartmentModal = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departmentName, setDepartmentName] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!departmentName) {
            error();
            return;
        } else {
            const newDepartment = {
                nombre: departmentName
            };
            await createDepartment(newDepartment);
            getDatos();
            setDepartmentName('');
            success();
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setDepartmentName('');
    };

    const handleChange = (e) => {
        setDepartmentName(e.target.value);
    };

    const success = () => {
        messageApi.success('Departamento guardado exitosamente');
    };

    const error = () => {
        messageApi.error('Error al guardar el departamento');
    };

    return (
        <>
            <Button className="w-full font-bold"onClick={showModal}>
                Agregar Departamento
            </Button>
            <Modal
                title="Agregar Departamento"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !departmentName }}
            >
                <Input
                    placeholder="Departamento..."
                    value={departmentName}
                    onChange={handleChange}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default DepartmentModal;
