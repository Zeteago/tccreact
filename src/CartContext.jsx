import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext(null);

//Inicia o carrinho
const getInitialCart = () => {
  try {
    const savedCart = localStorage.getItem('ayvucart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(getInitialCart);

  //Salva o carinho no localStorage sempre que cartItems mudar
  useEffect(() => {
    try {
      localStorage.setItem('ayvucart', JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cartItems]);

  const addItemToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        // adiciona quantidade ao item existente
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantidade: item.quantidade + quantity } : item
        );
      } else {
        //adiciona novo item ao carrinho
        const newItem = {
            id: product.id,
            id_loja: product.id_loja,
            nome: product.nome,
            preco: product.preco,
            // imagem_url: product.imagem_url, // Add if available
            quantidade: quantity
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeItemFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItemFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantidade: newQuantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantidade, 0);
  };

  const value = {
    cartItems,
    addItemToCart,
    removeItemFromCart,
    updateItemQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para acessar o contexto do carrinho
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

