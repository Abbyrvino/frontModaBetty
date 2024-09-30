import React, { useState } from 'react';
import { Button, Modal, Input, message } from 'antd';
import { createDiscount, saveBitacora } from '../../utils/postUtil';

const DiscountModal = ({getDatos}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [porcentaje, setPorcentaje] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [messageApi, contextHolder] = message.useMessage();

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if (!porcentaje || !descripcion) {
            error();
            return;
        } else {
            const newDiscount = {
                porcentaje: porcentaje,
                descripcion
            };
            const response = await createDiscount(newDiscount);
            if (response.status !== 200) {
                error();
                return;
            }
            await saveBitacora("Creacion de Descuento");
            getDatos();
            console.log("Descuento guardado:", newDiscount);
            //implementar la lógica para guardar el nuevo descuento

            setPorcentaje('');
            setDescripcion('');
            success();
            setIsModalOpen(false);
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setPorcentaje('');
        setDescripcion('');
    };

    const handlePorcentajeChange = (e) => {
        let inputValue = e.target.value;
        inputValue = inputValue.replace(/[^0-9]/g, '');
        if (inputValue !== '') {
            const value = parseInt(inputValue);
            if (value > 100) {
                message.error('El porcentaje no puede ser mayor al 100 %');
                inputValue = '100';
            } else if (value <= 0) {
                message.error('El porcentaje no puede ser menor a 0 %');
                inputValue = '0';
            }
        }
        setPorcentaje(inputValue);
    };

    const handleDescripcionChange = (e) => {
        setDescripcion(e.target.value);
    };

    const success = () => {
        messageApi.success('Descuento guardado exitosamente');
    };

    const error = () => {
        messageApi.error('Error al guardar el descuento');
    };

    return (
        <>
            <Button className="w-full font-bold"onClick={showModal}>
                Agregar Descuento
            </Button>
            <Modal
                title="Agregar Descuento"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Guardar"
                cancelText="Cerrar"
                okButtonProps={{ disabled: !porcentaje || !descripcion }}
            >
                <Input
                    placeholder="Porcentaje..."
                    value={porcentaje}
                    onChange={handlePorcentajeChange}
                    suffix="%"
                    style={{ marginBottom: 8 }}
                />
                <Input
                    placeholder="Descripción..."
                    value={descripcion}
                    onChange={handleDescripcionChange}
                />
                {contextHolder}
            </Modal>
        </>
    );
};

export default DiscountModal;
