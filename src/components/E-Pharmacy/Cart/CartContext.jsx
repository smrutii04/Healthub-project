import React, { createContext, useState, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Create a custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider to wrap around the app
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);


  // Add item to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if product is already in cart
      const productExists = prevItems.find((item) => item.id === product.id);
      if (productExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };


  
  // Remove item from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  // Update quantity
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
