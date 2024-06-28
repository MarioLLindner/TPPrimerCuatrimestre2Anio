import React, { useEffect, useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto'
import { putProducto } from '../../services/producto.service'

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
          <div className="form-group">
            <p>Nombre:</p>
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          </div>
          <div className="form-group">
            <p>Imagen:</p>
            <input type="text" placeholder="Imagen" value={imagenLink} onChange={(e) => setImagenLink(e.target.value)} required />
          </div>
          <div className="form-group">
            <p>Marca:</p>
            <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
          </div>
          <div className="form-group">
            <p>Descripción:</p>
            <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          </div>
          <div className="form-group">
            <p>Detalles:</p>
            <input type="text" placeholder="Detalles" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          </div>
          <div className="form-group">
            <p>Precio:</p>
            <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} required />
          </div>
          <div className="form-group">
            <p>Precio Oferta:</p>
            <input type="number" placeholder="Precio Oferta" value={precioOferta} onChange={(e) => setPrecioOferta(parseFloat(e.target.value))} />
          </div>
          <div className="form-group">
            <p>Stock:</p>
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          </div>
          <button type="submit">Editar Producto</button>
        </form>


      </div>
    </div>
  );
};

export default ProductoModalEditor
