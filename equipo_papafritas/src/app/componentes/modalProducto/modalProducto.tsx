import React, { useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto' 
import { postProducto } from '../../services/producto.service'
import { postImage } from '@/app/services/image.service';

const ProductoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [productoId, setProductoId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenLink, setImagenLink] = useState('');
  const [detalles, setDetalles] = useState('');
  const [precio, setPrecio] = useState(0);
  const [precioOferta, setPrecioOferta] = useState(0);


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
      await postProducto(productData); 
      onClose(); 
    } catch (error) {
      console.error('Error registering product:', error);
    }
  };


  const uploadToServer = async(e:any) => {
    const imageFile = e.target.files[0];
    const data = new FormData()
    data.append('file',imageFile)
    try {
      const resp = await postImage(data)
      const imgUrl = resp.data.url;
      setImagenLink(imgUrl);

      /* console.log(resp.data.url) */
      /* Data.data.url */
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }


  return (
    <div className="modal-background">
      <div className="register-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Registrar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="text" placeholder="Descripcion" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          <input type="file" placeholder="Imagen" onChange={uploadToServer} required />
          <input type="text" placeholder="Detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          <input type='number' placeholder="precio" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} required/> 
          <input type='number' placeholder="precioOferta" value={precioOferta} onChange={(e) => setPrecioOferta(parseFloat(e.target.value))} />
          <button type="submit">Registrar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductoModal
