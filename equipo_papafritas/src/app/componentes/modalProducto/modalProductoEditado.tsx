import React, { useEffect, useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto' 
import { putProducto } from '../../services/producto.service'

interface ProductoModalEditorProps {
    onClose: () => void;
    producto: iProducto; // Pasamos el producto completo como props
  }

const ProductoModalEditor: React.FC<ProductoModalEditorProps> = ({ onClose, producto }) => {
  const [productoId, setProductoId] = useState(producto.productoId);
  const [nombre, setNombre] = useState(producto.nombre);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [imagenLink, setImagenLink] = useState(producto.imagenLink);
  const [detalles, setDetalles] = useState(producto.detalles);
  const [precio, setPrecio] = useState(producto.precio);
  const [precioOferta, setPrecioOferta] = useState(producto.precioOferta);

  useEffect(() => {
    if (producto) {
      setProductoId(producto.productoId);
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setImagenLink(producto.imagenLink);
      setDetalles(producto.detalles);
      setPrecio(producto.precio);
      setPrecioOferta(producto.precioOferta);
    }
  }, [producto]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: iProducto = {
      productoId,
      nombre,
      descripcion,
      imagenLink,
      detalles,
      precio,
      precioOferta,
    };
    console.log('PRODUCT DATA', productData);

    try {
      await putProducto(productData); 
      onClose(); 
    } catch (error) {
      console.error('Error registering product:', error);
    }
  };


  return (
    <div className="modal-background">
      <div className="register-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          <input type="text" placeholder="Imagen" value={imagenLink} onChange={(e) => setImagenLink(e.target.value)} required />
          <input type="text" placeholder="Detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          <input type='number' placeholder="precio" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} required/> 
          <input type='number' placeholder="precioOferta" value={precioOferta} onChange={(e) => setPrecioOferta(parseFloat(e.target.value))} />
          <button type="submit">Editar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductoModalEditor
