"use client";
import React, { useEffect, useState } from 'react';
import { iProducto } from '@/app/model/CardProducto';
import { getProducto } from '@/app/services/producto.service';

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
    <div style={{ backgroundColor: 'white' }}>
      <h1>Producto Vista</h1>
      <p>ID del Producto: {producto.productoId}</p>
      <p>Nombre: {producto.nombre}</p>
      <p>imgLink: {producto.imagenLink}</p>
      <p>Descripción: {producto.descripcion}</p>
      <p>Precio: ${producto.precio}</p>
      {/* Aquí puedes agregar más detalles del producto si es necesario */}
    </div>
  );
};

export default ProductoVista;
