import React, { useState } from 'react';
import { Button, Modal, Input, Select, message } from 'antd';
import { createCategory } from '../../utils/postUtil'

const CategoryModal = ({ Departments, getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!categoryName || !selectedDepartment) {
            error();
            return;
        } else {
            const newCategory = {
                nombre: categoryName,
                departament: selectedDepartment
            };
            const response = await createCategory(newCategory);
            if (response.status !== 200){
                error();
                return;
            }
            getDatos();
            console.log("Categoría y departamento guardado:", newCategory);
            // implementar la lógica para guardar la nueva categoría

            setCategoryName('');
            setSelectedDepartment(null);
            success();
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setCategoryName('');
        setSelectedDepartment(null);
    };

    const handleChange = (e) => {
        setCategoryName(e.target.value);
    };

    const handleChangeDep = (value) => {
        const department = Departments.find(dept => dept.id === value);
        setSelectedDepartment(department);
    };

    const success = () => {
        messageApi.success('Categoría guardada exitosamente');
    };

    const error = () => {
        messageApi.error('Error, tiene que seleccionar un departamento y agregar el nombre de una categoría');
    };

    return (
        <>
            <Button className="w-full font-bold" onClick={showModal}>
                Agregar Categoría
            </Button>
            <Modal
                title="Agregar Categoría"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !categoryName }}
                centered
            >
                <Input
                    placeholder="Categoría..."
                    value={categoryName}
                    onChange={handleChange}
                />
                <div>Seleccionar Departamento</div>
                <Select
                    style={{ width: 200 }}
                    onChange={handleChangeDep}
                    value={selectedDepartment ? selectedDepartment.id : undefined}
                >
                    {Departments? Departments.map((department) => (
                        <Select.Option key={department.id} value={department.id}>
                            {department.nombre}
                        </Select.Option>
                    )): <Select.Option>
                            No elements reload modal
                        </Select.Option>}
                </Select>
                {contextHolder}
            </Modal>
        </>
    );
};

export default CategoryModal;
