import React, { useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto' 
import { postProducto } from '../../services/producto.service'
import { postImage } from '@/app/services/image.service';

const ProductoModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [productoId, setProductoId] = useState(null);
  const [nombre, setNombre] = useState('');
  const [marca, setMarca] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenLink, setImagenLink] = useState('');
  const [detalles, setDetalles] = useState('');
  const [precio, setPrecio] = useState(0);
  const [precioOferta, setPrecioOferta] = useState(0);
  const [stock, setStock] = useState(0);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: iProducto = {
      productoId,
      nombre,
      marca,
      descripcion,
      imagenLink,
      detalles,
      precio,
      precioOferta,
      stock,
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
          <label htmlFor="Nombre" className='Label-Producto'>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <label htmlFor="Marca" className='Label-Producto'>Marca</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
          <label htmlFor="Descripcion" className='Label-Producto'>Descripcion</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          <label htmlFor="Imagen" className='Label-Producto'>Imagen</label>
          <input type="file" className='InputArchivo' placeholder="Buscar Archivo..." onChange={uploadToServer} required />
          <label htmlFor="Detalles" className='Label-Producto'>{'Detalles (Separar por "," cada uno)'}</label>
          <input type="text" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          <label htmlFor="precio" className='Label-Producto'>Precio</label>
          <input type='number' placeholder="precio" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} required/> 
          <label htmlFor="precioOferta" className='Label-Producto'>Precio de Oferta</label>
          <input type='number' placeholder="precioOferta" value={precioOferta} onChange={(e) => setPrecioOferta(parseFloat(e.target.value))} />
          <label htmlFor="Stock" className='Label-Producto'>Stock</label>
          <input type='number' placeholder="stock" value={stock} onChange={(e) => setStock(parseFloat(e.target.value))} required/>
          <button type="submit">Registrar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductoModal
