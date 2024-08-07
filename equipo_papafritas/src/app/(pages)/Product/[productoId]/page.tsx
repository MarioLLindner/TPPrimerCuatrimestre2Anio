"use client";
import React, { useEffect, useState } from 'react';
import { iProducto } from '@/app/model/CardProducto';
import { delToCart, getForCart, getProducto } from '@/app/services/producto.service';
import './dinamicProduct.css';
import { addToCart } from '@/app/services/producto.service';

const ProductoVista = ({ params }: { params: { productoId: number } }) => {
  const [producto, setProducto] = useState<iProducto | null>(null);
  const [enCarrito, setEnCarrito] = useState(false);
  const detalles = producto?.detalles ? producto.detalles.split(',') : [];

  const añadirCarrito = async (productoId: number) => {
    const jwt = require('jsonwebtoken');
    try {
      const token = localStorage.getItem('token')
      const userId: number | null = jwt.decode(token).usuario.userId;
      if (userId) {
        await addToCart(productoId, userId)
      }
    } catch (error) {
      console.log('error añadiendo producto a carrito:', error)
    }
  }

  const quitarCarrito = async (productoId: number) => {
    const jwt = require('jsonwebtoken');
    try {
      const token = localStorage.getItem('token')
      const userId: number | null = jwt.decode(token).usuario.userId;
      if (userId) {
        await delToCart(productoId, userId)
      }
    } catch (error) {
      console.log('error eliminando producto a carrito:', error)
    }
  }

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const respuesta = await getProducto(params.productoId);
        setProducto(respuesta?.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    const checkCarrito = async () => {
      try {
        const rta = await getForCart();
        const rtadata = rta.data;
        const exists = rtadata.some((item: iProducto) => {
          return Number(item.productoId) === Number(params.productoId);
        });
        if (exists) {
          setEnCarrito(true);
        }
      } catch (error) {
        console.error('Error checking cart:', error);
      }
    };

    fetchProducto();
    checkCarrito();
  }, [params.productoId]);



  const handleCarrito = () => {
    setEnCarrito(!enCarrito);
    if (!enCarrito) {
      añadirCarrito(producto?.productoId);
    } else {
      quitarCarrito(producto?.productoId);
    }

  };

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <>
      <div className='contenedorProducto'>

        <div className='midContainer'>
          <img src={producto.imagenLink} alt={producto.nombre} className="product-image" />
          <div className="product-info">
            <h3 className='productTitle'>{producto.nombre}</h3>
            <h4 className='productBrand'>Marca: {producto.marca}</h4>
            <div>
              <h4 className='productDetails'>Detalles:</h4>
              {detalles.length > 0 && (
                <ul className="product-detalles-list">
                  {detalles.map((detalles, index) => (
                    <li key={index}>{detalles.trim()}</li>
                  ))}
                </ul>
              )}
            </div>
            <br />
            <br />
            <div className="product-pricing">
              <p className="product-price">${producto.precio}</p>
              {producto.precioOferta && (
                <p className="product-offer-price">Precio Oferta: ${producto.precioOferta}</p>
              )}
            </div>
            <div>
              <h5>Stock: {producto.stock} unidades</h5>
            </div>
            <button className="confirm-button" onClick={() => { handleCarrito() }}>
              {enCarrito ? 'En Carrito' : 'Añadir Carrito'}</button>
          </div>
        </div>
      </div>
      <div className='Product-Descipcion'>
        <h3>Descripcion:</h3>
        {producto.descripcion && <p className="product-description">{producto.descripcion}</p>}
      </div>
    </>
  );
};

export default ProductoVista;
