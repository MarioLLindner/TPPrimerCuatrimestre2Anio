import React, { useEffect, useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto' 
import { postProducto, getAllCategorias , postCategoria, getAllSubCategorias, postSubCategoria } from '../../services/producto.service'
import { postImage } from '@/app/services/image.service';

interface ICategoria {
  id: number;
  nombre: string;
}

interface ISubCategoria {
  id: number;
  nombre: string;
}

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
  const [categoria, setCategoria] = useState('');
  const [subcategoria, setSubCategoria] = useState('');
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<ISubCategoria[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevaSubCategoria, setNuevaSubCategoria] = useState('');
  const [mostrarInputCategoria, setMostrarInputCategoria] = useState(false);
  const [mostrarInputSubCategoria, setMostrarInputSubCategoria] = useState(false);
  


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
      categoria,
      subcategoria,
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
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  }

  const handleAddCategoria = async () => {
    try {
      const response = await postCategoria({ nombre: nuevaCategoria });
      setCategorias([...categorias, response.data]);
      setNuevaCategoria('');
      setMostrarInputCategoria(false);
    } catch (error) {
      console.error('Error al añadir nueva categoría:', error);
    }
  };

  const handleAddSubCategoria = async () => {
    try {
      const response = await postCategoria({ nombre: nuevaCategoria });
      setCategorias([...categorias, response.data]);
      setNuevaCategoria('');
      setMostrarInputCategoria(false);
    } catch (error) {
      console.error('Error al añadir nueva categoría:', error);
    }
  };
  

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getAllCategorias();
        setCategorias(response.data.categorias);
        setSubcategorias(response.data.subcategorias);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);


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
          <label htmlFor="Categoria" className='Label-Producto'>Categoria</label>
          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} required>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
            ))}
          </select>
          <button type="button" onClick={() => setMostrarInputCategoria(!mostrarInputCategoria)}>
            {mostrarInputCategoria ? 'Cancelar' : 'Añadir Categoría'}
          </button>
          {mostrarInputCategoria && (
            <div>
              <input
                type="text"
                value={nuevaCategoria}
                onChange={(e) => setNuevaCategoria(e.target.value)}
                placeholder="Nueva Categoría"
              />
              <button type="button" onClick={handleAddCategoria}>Guardar</button>
            </div>
          )}
          <label htmlFor="subcategoria" className='Label-Producto'>Sub-Categoria</label>
          <select value={subcategoria} onChange={(e) => setSubCategoria(e.target.value)} required>
            {subcategorias.map((sub) => (
              <option key={sub.id} value={sub.nombre}>{sub.nombre}</option>
            ))}
          </select>
          <button type="button" onClick={() => setMostrarInputSubCategoria(!mostrarInputSubCategoria)}>
            {mostrarInputSubCategoria ? 'Cancelar' : 'Añadir Sub-Categoría'}
          </button>
          {mostrarInputSubCategoria && (
            <div>
              <input
                type="text"
                value={nuevaSubCategoria}
                onChange={(e) => setNuevaSubCategoria(e.target.value)}
                placeholder="Nueva Sub-Categoría"
              />
              <button type="button" onClick={handleAddSubCategoria}>Guardar</button>
            </div>
          )}
          <button type="submit">Registrar Producto</button>
        </form>
      </div>
    </div>
  );
};

export default ProductoModal
