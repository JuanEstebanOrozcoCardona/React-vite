import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const mockProducts = [
  {
    id: 1,
    title: "Producto Mock 1",
    price: 10.99,
    description: "Descripción de producto mock 1",
    category: "mock",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    title: "Producto Mock 2",
    price: 12.99,
    description: "Descripción de producto mock 2",
    category: "mock",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    title: "Producto Mock 3",
    price: 15.99,
    description: "Descripción de producto mock 3",
    category: "mock",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    title: "Producto Mock 4",
    price: 9.99,
    description: "Descripción de producto mock 4",
    category: "mock",
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    title: "Producto Mock 5",
    price: 8.99,
    description: "Descripción de producto mock 5",
    category: "mock",
    image: "https://via.placeholder.com/150",
  },
];

export const ProductProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (producto, cantidad) => {
    setCart((prevCart) => {
      const idx = prevCart.findIndex(
        (item) => (item.id || item.nombre) === (producto.id || producto.nombre)
      );
      if (idx !== -1) {
        const updated = [...prevCart];
        updated[idx].cantidad += cantidad;
        return updated;
      }
      return [
        ...prevCart,
        {
          ...producto,
          cantidad,
        },
      ];
    });
  };

  const increaseCartItem = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id || item.nombre) === id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  };

  const decreaseCartItem = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          (item.id || item.nombre) === id && item.cantidad > 1
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => (item.id || item.nombre) !== id));
  };

  useEffect(() => {
    setLoading(true);
    setError("");
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        setProductos(data.slice(5, 10));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener productos:", err);
        setError(
          "No se pudo obtener productos reales. Mostrando productos de ejemplo."
        );
        setProductos(mockProducts);
        setLoading(false);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ productos, loading, error, cart, addToCart, increaseCartItem, decreaseCartItem, removeFromCart }}>
      {children}
    </ProductContext.Provider>
  );
};
