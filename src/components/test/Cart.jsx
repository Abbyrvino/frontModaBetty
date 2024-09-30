import React, { useState } from 'react';
import { List, Button, Modal } from 'antd';
import { useCart } from './CartContext';
import { formatearDinero } from "../../helpers"; // Sube dos niveles
import RealizarTipoDePago from '../modalComponents/RealizarTipoDePago';

const Cart = ({ isVisible, onCancel }) => {
  const { cartItems, handleRemoveFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(isVisible || false); // Estado para abrir/cerrar el modal

  // Función para cerrar el modal
  const handleCancel = () => {
    setIsModalOpen(false); // Cambia el estado para cerrar el modal
    if (onCancel) onCancel(); // Ejecuta la función onCancel pasada como prop, si existe
  };

  // Calcular el precio total con formateo
  const totalPrice = cartItems.reduce((total, item) => {
    const precio = item.product.producto.precio || 0; // Asegúrate de que el precio no sea undefined
    return total + (precio * item.quantity);
  }, 0);

  return (
    <div>
      <Modal
        title={<div className="text-center">Carrito de Compras</div>}
        open={isModalOpen} // Usar isModalOpen para controlar la visibilidad
        onCancel={handleCancel} // Llamar a handleCancel para cerrar el modal
        footer={null}
      >
        <List
          dataSource={cartItems}
          grid={{
            gutter: 16,
            column: 4,
          }}
          renderItem={(item) => (
            <List.Item >
              <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
                <img
                  src={item.product.producto.imagen?.enlace || 'default-image.jpg'}
                  alt={item.product.producto.nombre}
                  width={50}
                  className="mb-4"
                />
                <p className="text-lg font-semibold">{item.product.producto.nombre}</p>
                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                <p className="text-gray-600">
                  Precio: {formatearDinero(item.product.producto.precio * item.quantity)} Bs {/* Formateo de dinero */}
                </p>
                <p className="text-red-500">
                  Descuento: {formatearDinero(item.product.producto.precio *
                    (item.product.producto.descuento.porcentaje / 100) *
                    item.quantity)} Bs
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => handleRemoveFromCart(item.product.id)}
                >
                  Eliminar
                </button>
              </div>
            </List.Item>
          )}
        />
        <h3>Total: {formatearDinero(totalPrice)} Bs</h3> {/* Formateo del total */}
        <div className="custom-button">
          <RealizarTipoDePago /> {/* Modal de pago */}
        </div>
      </Modal>
    </div>
  );
};

export default Cart;

