import React, { useState } from 'react'
import { Button, Modal } from 'antd';
import RealizarNotaDeVenta from './RealizarNotaDeVenta';

const RealizarTipoDePago = ({ getDatos }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVentaModalOpen, setIsVentaModalOpen] = useState(false);
    const [isQRModalOpen, setIsQRModalOpen] = useState(false);
    const [isPagoRealizadoModalOpen, setIsPagoRealizadoModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handlePago = (tipo) => {
        if (tipo === 'Pago por Stripe') {
            setIsPagoRealizadoModalOpen(true);
            window.open('https://buy.stripe.com/test_4gw3e910TaQucuYbIK', '_blank');
        } else if (tipo === 'Pago por QR') {
            setIsQRModalOpen(true);
        } else if (tipo === 'Pago en efectivo') {
            setIsPagoRealizadoModalOpen(true);
        } else {
            console.log(`Pago seleccionado: ${tipo}`);
            getDatos();
            setIsModalOpen(false);
        }
    };

    const handleQRPaymentConfirmed = () => {
        setIsQRModalOpen(false);
        setIsVentaModalOpen(true);
        setIsModalOpen(false);
    };
    const handlePagoRealizadoConfirm = () => {
        setIsPagoRealizadoModalOpen(false);
        setIsModalOpen(false);
        setIsVentaModalOpen(true);
    };
    return (
        <>
            <Button className="w-full font-bold" onClick={showModal}>
                Completar Compra
            </Button>

            <Modal
                title={<div className="text-center">Realizar Pago</div>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <div className="flex flex-col items-center space-y-2">
                    <Button onClick={() => handlePago('Pago en efectivo')} className="w-full max-w-xs">
                        Pago en efectivo
                    </Button>
                    <Button onClick={() => handlePago('Pago por Stripe')}  className="w-full max-w-xs" >
                        Pago por Stripe
                    </Button>
                    <Button onClick={() => handlePago('Pago por QR')} className="w-full max-w-xs" >
                        Pago por QR
                    </Button>
                </div>
            </Modal>


            <RealizarNotaDeVenta
                isVisible={isVentaModalOpen}
                onCancel={() => setIsVentaModalOpen(false)}
            />

            <Modal
                title={<div className="text-center">Confirmar Pago</div>}
                open={isPagoRealizadoModalOpen}
                onCancel={() => setIsPagoRealizadoModalOpen(false)}
                footer={[
                    <div className="flex flex-col items-center space-y-2">
                    <Button key="cancel" onClick={() => setIsPagoRealizadoModalOpen(false)} className="w-full max-w-xs">
                        Cancelar
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handlePagoRealizadoConfirm} className="w-full max-w-xs">
                        Pago Realizado
                    </Button>,
                    </div>
                ]}
            >
            </Modal>

            <Modal
                title="Pagar por QR"
                open={isQRModalOpen}
                onCancel={() => setIsQRModalOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsQRModalOpen(false)}>
                        Cancelar
                    </Button>,
                    <Button key="confirm" type="primary" onClick={handleQRPaymentConfirmed}>
                        Pago Realizado
                    </Button>,
                ]}
            >
                {/*esta imagen la subimos directamente o hacemos una interfaz extra para que el admin pueda subir un QR?*/}
                <p>Aquí iría la imagen del QR</p>
            </Modal>
        </>
    );
}

export default RealizarTipoDePago