import React, { useEffect, useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto'
import { putProducto } from '../../services/producto.service'
import { postImage } from '@/app/services/image.service';

interface ProductoModalEditorProps {
  onClose: () => void;
  producto: iProducto;
}

const ProductoModalEditor: React.FC<ProductoModalEditorProps> = ({ onClose, producto }) => {
  const [productoId, setProductoId] = useState(producto.productoId);
  const [nombre, setNombre] = useState(producto.nombre);
  const [imagenLink, setImagenLink] = useState(producto.imagenLink);
  const [marca, setMarca] = useState(producto.marca);
  const [descripcion, setDescripcion] = useState(producto.descripcion);
  const [detalles, setDetalles] = useState(producto.detalles);
  const [precio, setPrecio] = useState(producto.precio);
  const [precioOferta, setPrecioOferta] = useState(producto.precioOferta);
  const [stock, setStock] = useState(producto.stock);

  useEffect(() => {
    if (producto) {
      setProductoId(producto.productoId);
      setNombre(producto.nombre);
      setImagenLink(producto.imagenLink);
      setMarca(producto.marca);
      setDescripcion(producto.descripcion);
      setDetalles(producto.detalles);
      setPrecio(producto.precio);
      setPrecioOferta(producto.precioOferta);
      setStock(producto.stock);
    }
  }, [producto]);

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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData: iProducto = {
      productoId,
      nombre,
      imagenLink,
      marca,
      descripcion,
      detalles,
      precio,
      precioOferta,
      stock
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
          <label htmlFor="Nombre" className='Label-Producto'>Nombre</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <label htmlFor="Imagen" className='Label-Producto'>Imagen</label>
          <input type="file" className='InputArchivo' placeholder="Buscar Archivo..." onChange={uploadToServer}/>
          <label htmlFor="Marca" className='Label-Producto'>Marca</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
          <label htmlFor="Descripcion" className='Label-Producto'>Descripcion</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          <label htmlFor="Detalles" className='Label-Producto'>{'Detalles (Separar por "," cada uno)'}</label>
          <input type="text" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          <label htmlFor="precio" className='Label-Producto'>Precio</label>
          <input type='number' placeholder="precio" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} required />
          <label htmlFor="precioOferta" className='Label-Producto'>Precio de Oferta</label>
          <input type='number' placeholder="precioOferta" value={precioOferta} onChange={(e) => setPrecioOferta(parseFloat(e.target.value))} />
          <label htmlFor="Stock" className='Label-Producto'>Stock</label>
          <input type='number' placeholder="stock" value={stock} onChange={(e) => setStock(parseFloat(e.target.value))} required />
          <button type="submit">Editar Producto</button>
        </form>
      </div>
    </div>
  );
};
export default ProductoModalEditor
