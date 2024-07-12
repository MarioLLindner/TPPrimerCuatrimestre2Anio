import React, { useEffect, useState } from 'react';
import './modalRegistro.css';
import { iProducto } from '../../model/CardProducto';
import { putProducto, getAllCategorias, postCategoria, postSubCategoria, getSubCategoriasByCategoriaId } from '../../services/producto.service';
import { postImage } from '@/app/services/image.service';

interface ProductoModalEditorProps {
  onClose: () => void;
  producto: iProducto;
}

interface ICategoria {
  idCategoria: number;
  nombreCategoria: string;
}

interface ISubCategoria {
  idCategoria: number;
  idSubCategoria: number;
  nombreSubCategoria: string;
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
  const [idCategoria, setIdCategoria] = useState(0);
  const [categoria, setCategoria] = useState<string | undefined>(producto.categoria);
  const [subcategoria, setSubCategoria] = useState<string | undefined>(producto.subcategoria);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [subcategorias, setSubcategorias] = useState<ISubCategoria[]>([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevaSubCategoria, setNuevaSubCategoria] = useState('');
  const [mostrarInputCategoria, setMostrarInputCategoria] = useState(false);
  const [mostrarInputSubCategoria, setMostrarInputSubCategoria] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await getAllCategorias();
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (categoria) {
        const idCategoria = typeof categoria === 'string' ? Number(categoria) : categoria;
        try {
          const response = await getSubCategoriasByCategoriaId(idCategoria);
          setSubcategorias(response.data);
        } catch (error) {
          console.error('Error al cargar subcategorías:', error);
        }
      }
    };
    fetchSubcategorias();
  }, [categoria]);

  const uploadToServer = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = e.target.files?.[0];
    if (imageFile) {
      const data = new FormData();
      data.append('file', imageFile);
      try {
        const resp = await postImage(data);
        const imgUrl = resp.data.url;
        setImagenLink(imgUrl);
      } catch (error) {
        console.error('Error al subir la imagen:', error);
      }
    }
  };

  const handleAddCategoria = async () => {
    try {
      const response = await postCategoria({ nombreCategoria: nuevaCategoria });
      setCategorias([...categorias, response.data]);
      setNuevaCategoria('');
      setMostrarInputCategoria(false);
    } catch (error) {
      console.error('Error al añadir nueva categoría:', error);
    }
  };

  const handleAddSubCategoria = async () => {
    try {
      const nuevaSubCat: ISubCategoria = {
        nombreSubCategoria: nuevaSubCategoria,
        idCategoria: Number(categoria),
        idSubCategoria: 0
      };
      const response = await postSubCategoria(nuevaSubCat);
      setSubcategorias([...subcategorias, response.data]);
      setNuevaSubCategoria('');
      setMostrarInputSubCategoria(false);
    } catch (error) {
      console.error('Error al añadir nueva Sub categoría:', error);
    }
  };
  
  const handleChangeCategoria = (e: any) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCategoria(e.target.value);
    setIdCategoria(selectedOption.getAttribute('data-id'));
  };

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
      stock,
      categoria,
      subcategoria,
    };
    try {
      await putProducto(productData);
      onClose();
    } catch (error) {
      console.error('Error editando producto:', error);
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
          <input type="file" className='InputArchivo' placeholder="Buscar Archivo..." onChange={uploadToServer} />
          <label htmlFor="Marca" className='Label-Producto'>Marca</label>
          <input type="text" value={marca} onChange={(e) => setMarca(e.target.value)} required />
          <label htmlFor="Descripcion" className='Label-Producto'>Descripcion</label>
          <input type="text" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
          <label htmlFor="Detalles" className='Label-Producto'>{'Detalles (Separar por "," cada uno)'}</label>
          <input type="text" value={detalles} onChange={(e) => setDetalles(e.target.value)} required />
          <label htmlFor="categoria" className='Label-Producto'>Categoría</label>

          <select value={categoria} onChange={(e) => setCategoria(e.target.value)} >
            <option value="">Seleccionar categoría</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>{cat.nombreCategoria}</option>
              
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
          <label htmlFor="subCategoria" className='Label-Producto'>Sub Categoría</label>

          <select value={subcategoria} onChange={(e) => setSubCategoria(e.target.value)}>
            <option value="">Seleccionar sub-categoría</option>
            {subcategorias.map((sub) => (
              <option key={sub.idSubCategoria} value={sub.nombreSubCategoria}>{sub.nombreSubCategoria}</option>
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


/*maso */

export default ProductoModalEditor;
