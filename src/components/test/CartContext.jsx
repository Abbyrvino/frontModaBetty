import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (product, quantityToAdd) => {
    const existingItem = cartItems.find(item => item.product.producto.id === product.producto.id);
    const totalQuantity = existingItem ? existingItem.quantity + quantityToAdd : quantityToAdd;

    if (totalQuantity <= product.cantidad) {
      if (existingItem) {
        setCartItems(cartItems.map(item =>
          item.product.producto.id === product.producto.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        ));
      } else {
        setCartItems([...cartItems, { product, quantity: quantityToAdd }]);
      }
    } else {
      alert(`Solo hay ${product.cantidad} unidades disponibles.`);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.product.producto.id !== productId));
  };

  return (
    <CartContext.Provider value={{ cartItems, handleAddToCart, handleRemoveFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
