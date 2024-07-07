'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './productsList.css';
import { deleteProducto, getAllProductos } from '@/app/services/producto.service';
import { iProducto } from '@/app/model/CardProducto';
import ProductoModalEditor from '../../modalProducto/modalProductoEditado';

export const ProductList = () => {
  const [product, setProducts] = useState<iProducto[]>([]);
  const [showProductsAux, setShowProductsAux] = useState<iProducto[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<iProducto | null>(null);

  const fetchProducts = async () => {
    try {
      const rtaProduct = await getAllProductos();
      const listProduct: iProducto[] = rtaProduct.data.map((prod: any) => {
        return {
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

        };
      });
      setProducts(listProduct)
      setShowProductsAux(listProduct)
      console.log(listProduct);
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleButtonClick = async () => {
    setShowProducts(!showProducts);
    await fetchProducts();
  };

  const handleDelete = async (productoId: number) => {
    const productToDelete = product.find(p => p.productoId === productoId);
    console.log(productToDelete);
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



  return (
    <>
      <div>
        <Button variant="outline-primary" onClick={handleButtonClick}>{showProducts ? 'Ocultar Productos' : 'Mostrar Productos'}</Button>
        {showProducts && (
          <div className="list-container">
            <div className="list-header">
              <span>ID</span>
              <span>Nombre</span>
              <span>Imagen</span>
              <span>Marca</span>
              <span>Description</span>
              <span>Detalles</span>
              <span>Categoria</span>
              <span>SubCategoria</span>
              <span>Stock</span>
              <span>Price</span>
              <span>Price Oferta</span>
              <span>Actions</span>
            </div>
            {product.map((product, index) => (
              <div key={index} className="list-item">
                <span>{product.productoId}</span>
                <span>{product.nombre}</span>
                <span><img src={product.imagenLink} alt={product.nombre} /></span>
                <span> {product.marca}</span>
                <span className='product-Descripcion'> {product.descripcion}</span>
                <span>{product.detalles}</span>
                <span>{product.categoria}</span>
                <span>{product.subcategoria}</span>
                <span>{product.stock}</span>
                <span>{product.precio}</span>
                <span>{product.precioOferta}</span>
                <span className='actions'>
                  <Button variant="outline-success" onClick={() => handleEdit(product.productoId)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(product.productoId)}>Delete</Button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {editingProduct && (
        <ProductoModalEditor producto={editingProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};
