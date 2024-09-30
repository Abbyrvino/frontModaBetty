import React from 'react';
import { Modal, Button } from 'antd';

const RealizarNotaDeVenta = ({ isVisible, onCancel }) => {
    // Función para guardar PDF
    const handleSavePDF = () => {
        console.log('Enviando datos para guardar PDF...');
        // Lógica para generar el PDF
        onCancel();  // Cerrar el modal después de guardar
    };

    // Función para guardar Excel
    const handleSaveExcel = () => {
        console.log('Enviando datos para guardar Excel...');
        // Lógica para generar el archivo Excel
        onCancel();  // Cerrar el modal después de guardar
    };

    return (
        <Modal
            title={<div className="text-center">Nota de Venta de la compra realizada</div>}
            open={isVisible}  // Usar open correctamente
            onCancel={onCancel}  // Maneja el cierre del modal desde el padre
            footer={null}  // Sin pie de página en el modal
        >
            <div className="flex flex-col items-center space-y-2">
                {/* Botón para guardar en PDF */}
                <Button onClick={handleSavePDF} className="w-full max-w-xs">
                    Guardar PDF
                </Button>
                
                {/* Botón para guardar en Excel */}
                <Button onClick={handleSaveExcel} className="w-full max-w-xs">
                    Guardar Excel
                </Button>
            </div>
        </Modal>
    );
};

export default RealizarNotaDeVenta;
