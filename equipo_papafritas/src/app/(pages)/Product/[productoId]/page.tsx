"use client";
import React, { useEffect, useState } from 'react';
import { iProducto } from '@/app/model/CardProducto';
import { getProducto } from '@/app/services/producto.service';
import './dinamicProduct.css';

const ProductoVista = ({ params }: { params: { productoId: number } }) => {
  const [producto, setProducto] = useState<iProducto | null>(null);
  const detalles = producto?.detalles ? producto.detalles.split(',') : [];

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
            <button className="confirm-button">Añadir Carrito</button>
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
