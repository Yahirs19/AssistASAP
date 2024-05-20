"use client";
import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  slug: string;
  cantidad: number;
}

interface CartContextType {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  insertarUno: (productId: string) => void;
  removerUno: (productId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const indexOfProduct = cart.findIndex((producto)=>producto.id === product.id);
    console.log(indexOfProduct)
    if(indexOfProduct >= 0){

      setCart((prevCart) => [
        ...prevCart.slice(0, indexOfProduct),
        {...prevCart[indexOfProduct], cantidad: prevCart[indexOfProduct].cantidad += 1},
        ...prevCart.slice(indexOfProduct + 1)
      ]);

    }
    else{
      setCart(prevState => [...prevState, { ...product, cantidad: 1 }])
    }
  };
  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((product) => product.id !== productId)
    );
  };

  const insertarUno = (productId: string) => {
    const indexOfProduct = cart.findIndex((producto) => producto.id === productId);

    console.log("Test");
    console.log(cart);

    if(indexOfProduct >= 0){
      const elementosCarrito = [...cart];

      let cambioCantidadElemento = elementosCarrito[indexOfProduct];
      cambioCantidadElemento.cantidad++;

      setCart([...elementosCarrito]);

    }
  }

  const removerUno = (productId: string) => {
    const indexOfProduct = cart.findIndex((producto) => producto.id === productId);

    console.log("Test");

    if(indexOfProduct >= 0){

      const elementosCarrito = [...cart];

      let cambioCantidadElemento = elementosCarrito[indexOfProduct];

      console.log(cambioCantidadElemento.cantidad)
      
      cambioCantidadElemento.cantidad--;
      
      if(cambioCantidadElemento.cantidad < 1){
        removeFromCart(productId);
      }else{
        setCart([...elementosCarrito]);
      }


    }
  }

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, insertarUno, removerUno }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
