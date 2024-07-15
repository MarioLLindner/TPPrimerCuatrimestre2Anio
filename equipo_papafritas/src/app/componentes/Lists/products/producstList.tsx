'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productsList.css';
import { deleteProducto, getAllProductos, getNombreCatbyId } from '@/app/services/producto.service';
import { iProducto } from '@/app/model/CardProducto';
import ProductoModalEditor from '../../modalProducto/modalProductoEditado';

const ITEMS_PER_PAGE = 15;
const MAX_PAGE_BUTTONS = 5;

export const ProductList = () => {
  const [product, setProducts] = useState<iProducto[]>([]);
  const [showProductsAux, setShowProductsAux] = useState<iProducto[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<iProducto | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const fetchProducts = async () => {
    try {
      const rtaProduct = await getAllProductos();
      const listProduct: iProducto[] = rtaProduct.data.map((prod: any) => ({
        productoId: prod.productoId,
        nombre: prod.nombre,
        imagenLink: prod.imagenLink,
        marca: prod.marca,
        descripcion: prod.descripcion,
        detalles: prod.detalles,
        precio: prod.precio,
        precioOferta: prod.precioOferta,
        stock: prod.stock,
        categoria: prod.categoria,
        subcategoria: prod.subcategoria
      }));
  
      setProducts(listProduct);
      setShowProductsAux(listProduct);
  
      // Llama a cambiarCategorias después de establecer los productos
      await cambiarCategorias(listProduct);
  
    } catch (error: any) {
      alert(error.message);
    }
  }
  
  const cambiarCategorias = async (productos: iProducto[]) => {
    try {
      const nuevos = await Promise.all(productos.map(async (prod: iProducto) => {
        const categoria = await getNombreCatbyId(Number(prod.categoria)); 
        return {
          ...prod,
          categoria: categoria.toString(), // Convertir a cadena si es necesario
        };
      }));
      
      setProducts(nuevos);
  
    } catch (error) {
      console.error('Error cambiando categorías:', error);
    }
  }
  


  const handleButtonClick = async () => {
    setShowProducts(!showProducts);
    await fetchProducts();
  };

  const handleDelete = async (productoId: number) => {
    const productToDelete = product.find(p => p.productoId === productoId);
    try {
      if (productToDelete) {
        await deleteProducto(productToDelete);
        await fetchProducts();
      }
    } catch (error) {
      console.log(error)
    }
  };



  const handleEdit = async (productoId: number) => {
    const productToEdit = product.find(p => p.productoId === productoId);
    setEditingProduct(productToEdit || null);
    await fetchProducts();
  };

  const handleCloseModal = async () => {
    setEditingProduct(null);
    await fetchProducts();
  };


  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

  const displayedProducts = product.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'primary' : 'outline-primary'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      <div>
        <Button variant="outline-primary" onClick={handleButtonClick}>
          {product.length === 0 ? 'Mostrar Productos' : 'Ocultar Productos'}
        </Button>
        {showProducts && ( 
          
        
            <div className="list-container">
            <div className="list-header">
              <span>ID</span>
              <span>Nombre</span>
              <span>Imagen</span>
              <span>Marca</span>
              <span>Descripción</span>
              <span>Detalles</span>
              <span>Categoria</span>
              <span>SubCategoria</span>
              <span>Stock</span>
              <span>Precio</span>
              <span>Precio Oferta</span>
              <span>Acciones</span>
            </div>
            {displayedProducts.map((product, index) => (
              <div key={index} className="list-item">
                <span>{product.productoId}</span>
                <span className="product-nombre">{product.nombre}</span>
                <span><img src={product.imagenLink} alt={product.nombre} /></span>
                <span>{product.marca}</span>
                <span className="product-descripcion">{product.descripcion}</span>
                <span className="product-detalles">{product.detalles}</span>
                <span className="product-categoria">{product.categoria}</span>
                <span className="product-subcategoria">{product.subcategoria}</span>
                <span>{product.stock}</span>
                <span>{product.precio}</span>
                <span>{product.precioOferta}</span>
                <span className="actions">
                  <Button variant="outline-success" onClick={() => handleEdit(product.productoId)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(product.productoId)}>Delete</Button>
                </span>
              </div>
            ))}
        </div>
      )}
      {showProducts && ( 
        <div className="pagination">
          {currentPage > 1 && (
            <Button variant="outline-primary" onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </Button>
          )}
          {renderPaginationButtons()}
          {currentPage < totalPages && (
            <Button variant="outline-primary" onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </Button>
          )}
        </div>
        )}
      </div>
      
      {editingProduct && (
        <ProductoModalEditor producto={editingProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};
