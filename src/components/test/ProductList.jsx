/*import React, { useState, useEffect } from 'react';
import { Row, Col, Spin, Input  } from 'antd';
import axios from 'axios';
import ProductCard from './ProductCard';
import { fetchProducts } from './datosTest';
const { Search } = Input;
const ProductList = ({ selectedCategory }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    const getDatos = async () => {
        setLoading(true);
        const products = await fetchProducts(selectedCategory);
        setProducts(products);
        setFilteredProducts(products);
        setLoading(false);
    }

  useEffect(() => {
    if (selectedCategory) {
        getDatos();
    }
  }, [selectedCategory]);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.producto.nombre?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Search
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20 }}
      />
      <Row gutter={[16, 16]}>
        {filteredProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6} xl={6}>
            <ProductCard product={product} onAddToCart={() => {}} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;*/

/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Obtener productos del backend
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/producto/all');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div>
            <h2>Lista de Productos</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        style={{
                            border: '1px solid #ddd',
                            padding: '10px',
                            margin: '10px',
                            width: '200px',
                            textAlign: 'center',
                            borderRadius: '8px',
                        }}
                    >
                        <img
                            src={producto.imagen.enlace}
                            alt={producto.nombre}
                            style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                        />
                        <h3>{producto.nombre}</h3>
                        <p>{producto.precio} $</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosList;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductosList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        // Obtener productos del backend
        const fetchProductos = async () => {
            try {
                const response = await axios.get('http://localhost:8080/producto/all');
                setProductos(response.data);
            } catch (error) {
                console.error('Error al obtener los productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Lista de Productos</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {productos.map((producto) => (
                    <div
                        key={producto.id}
                        className="max-w-xs bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300"
                    >
                        <img
                            src={producto.imagen.enlace}
                            alt={producto.nombre}
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{producto.nombre}</h3>
                            <p className="text-lg font-medium text-gray-600 mt-2">{producto.precio} $</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductosList;

