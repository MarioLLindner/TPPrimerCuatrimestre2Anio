"use client";
import React, { useEffect, useState } from 'react';
import { iProducto } from '@/app/model/CardProducto';
import { getProducto } from '@/app/services/producto.service';
import './dinamicProduct.css';

const ProductoVista = ({ params }: { params: { productoId: number } }) => {
  const [producto, setProducto] = useState<iProducto | null>(null);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        console.log('id producto buscado', params.productoId)
        const respuesta = await getProducto(params.productoId);
        setProducto(respuesta?.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProducto();
  }, [params.productoId]);

  if (!producto) {
    return <p>Cargando...</p>;
  }

  return (
    <div className='contenedorProducto'>

      <div className='midContainer'>
        <img src={producto.imagenLink} alt={producto.nombre} className="product-image" />
        <div className="product-info">
          <h3 className='productTitle'>{producto.nombre}</h3>
          {producto.descripcion && <p className="product-description">{producto.descripcion}</p>}
          <div className="product-pricing">
            <p className="product-price">${producto.precio}</p>
            <button className="confirm-button">Añadir Carrito</button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductoVista;
