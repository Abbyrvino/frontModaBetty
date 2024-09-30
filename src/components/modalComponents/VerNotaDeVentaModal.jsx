import React from 'react';
import { Modal, Table } from 'antd';

const VerNotaDeVentaModal = ({ visible, onCancel, venta }) => {   
    const columns = [
        {
            title: 'Producto',
            dataIndex: ['producto', 'nombre'],
            key: 'producto',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
        },
        {
            title: 'Precio Unitario',
            dataIndex: ['producto', 'precio'],
            key: 'precio',
            render: (precio) => `Bs ${precio}`,
        },
        {
            title: 'Subtotal',
            key: 'subtotal',
            render: (text, record) => `Bs ${record.cantidad * record.producto.precio}`,
        },
    ];

    const calcularTotal = (detalleVenta) => {
        return detalleVenta.reduce((acc, item) => acc + item.cantidad * item.producto.precio, 0);
    };

    return (
        <Modal
            title={`Nota de Venta ID: ${venta ? venta.id : ''}`}
            open={isModalOpen}
            onCancel={onCancel}
            footer={null}
            width={800}
        >
            {venta ? (
                <>
                    <p><strong>Fecha:</strong> {new Date(venta.fecha).toLocaleString()}</p>
                    <p><strong>Cliente:</strong> {venta.person.nombre}</p>
                    <p><strong>Estado:</strong> {venta.status}</p>
                    <p><strong>Tipo de Pago:</strong> {venta.tipoPago.nombre}</p>
                    <Table columns={columns} dataSource={venta.detalleVenta} pagination={false} />
                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <strong>Total:</strong> Bs {calcularTotal(venta.detalleVenta)}
                    </div>
                </>
            ) : (
                <p>No hay datos disponibles para esta venta.</p>
            )}
        </Modal>
    );
};

export default VerNotaDeVentaModal;
