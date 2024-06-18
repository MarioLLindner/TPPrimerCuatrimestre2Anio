import React, { useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto' 
import { postProducto } from '../../services/producto.service'

const ProductoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenLink, setImagenLink] = useState('');
  const [detalles, setDetalles] = useState('');
  const [precio, setPrecio] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: iProducto = {
      nombre,
      descripcion,
      imagenLink,
      detalles,
      precio,
      precioOferta,
    };
    console.log('PRODUCT DATA', productData);

    try {
      await postProducto(productData); 
      onClose(); 
    } catch (error) {
      console.error('Error registering product:', error);
    }
  };


  return (
    <div className="modal-background">
      <div className="register-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Registrar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          <input type="text" placeholder="Imagen" value={imagenLink} onChange={(e) => setImagenLink(e.target.value)} required />
          <input type="text" placeholder="Detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          <input type="text" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} required/> 
          <input type="text" placeholder="Precio de Oferta" value={precioOferta} onChange={(e) => setPrecioOferta(e.target.value)} />
          <button type="submit">Registrar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductoModal
