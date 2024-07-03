'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userList.css';
import { deleteProducto, getAllProductos } from '@/app/services/producto.service';
import { iProducto } from '@/app/model/CardProducto';
import ProductoModalEditor from '../../modalProducto/modalProductoEditado';
import { iUsuario } from '@/app/model/UsuarioLogin';
import { deleteUser, getAllUsers } from '@/app/services/user.service';
import ModalEditUser from '../../modalRegistro/modalRegistroEditor'
import { userEdit } from '@/app/model/UsuarioLogin'

export const UserList = () => {
  const [usuario, setUsuarios] = useState<iUsuario[]>([])
  const [showUsersAux, setShowUsersAux] = useState<iUsuario[]>([])
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<userEdit | null>(null);



  const fetchUsers = async () => {
    try {
      const rtaUsers = await getAllUsers();
      const listUsers: iUsuario[] = rtaUsers.data.map((user: any) => {
        return {
          userId: user.userId,
          nombre: user.nombre,
          email: user.email,
          apellido: user.apellido,
          password: user.password,
          telefono: user.telefono,
          provincia: user.provincia,
          ciudad: user.ciudad,
          codigoPostal: user.codigoPostal,
          direccion: user.direccion,
        }
      });
      setUsuarios(listUsers);
      setShowUsersAux(listUsers)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleButtonClick = async () => {
    setShowUsers(!showUsers);
    await fetchUsers();
  };


  const handleDelete = async (userId: number) => {
    const userToDelete = usuario.find(u => u.userId === userId);
    console.log(userToDelete)
    try {
      if (userToDelete) {
        await deleteUser(userToDelete)
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (userId: number) => {
    const userToEdit = usuario.find(u => u.userId === userId);
    if (userToEdit) {
      const userToEditWithDefaults: userEdit = {
        ...userToEdit,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      };
      setEditingUser(userToEditWithDefaults);
    }
    await fetchUsers();
  };

  const handleCloseModal = async () => {
    setEditingUser(null);
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className='Div-container-General'>
        <Button className='BotonMostrarInfo' variant="outline-primary" onClick={handleButtonClick}>{showUsers ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}</Button>
        {showUsers && (
          <div className="list-container">
            <div className="list-header">
              <span>ID</span>
              <span>First Name</span>
              <span>Last Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Province</span>
              <span>City</span>
              <span>Postal Code</span>
              <span>Address</span>
              <span>Actions</span>
            </div>
            {usuario.map((usuario, index) => (
              <div key={index} className="list-item">
                <span>{usuario.userId} </span>
                <span>{usuario.nombre} </span>
                <span>{usuario.apellido}</span>
                <span>{usuario.email}</span>
                <span>{usuario.telefono}</span>
                <span>{usuario.provincia}</span>
                <span>{usuario.ciudad}</span>
                <span>{usuario.codigoPostal}</span>
                <span>{usuario.direccion}</span>
                <span className="actions">
                  <Button variant="outline-success" onClick={() => handleEdit(usuario.userId)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(usuario.userId)}>Delete</Button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {editingUser && (
        <ModalEditUser usuarioedit={editingUser} onClose={handleCloseModal} />
      )}
    </>
  );
};




//parte de ProductList
const ITEMS_PER_PAGE = 20;

export const ProductList = () => {
  const [product, setProducts] = useState<iProducto[]>([]);
  const [showProductsAux, setShowProductsAux] = useState<iProducto[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [editingProduct, setEditingProduct] = useState<iProducto | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

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
          stock: prod.stock
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

  const handlePageChange = (pageNumber:any) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstProduct = indexOfLastProduct - ITEMS_PER_PAGE;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(product.length / ITEMS_PER_PAGE);


  useEffect(() => {
    fetchProducts();
  }, []);



  return (
    <>
      <div className='Div-container-General'>
        <Button className="BotonMostrarInfo" variant="outline-primary" onClick={handleButtonClick}>{showProducts ? 'Ocultar Productos' : 'Mostrar Productos'}</Button>
        {showProducts && (
          <>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              position="top" /><div className="list-container">
              <div className="list-header">
                <span>ID</span>
                <span>Nombre</span>
                <span>Imagen</span>
                <span>Marca</span>
                <span>Description</span>
                <span>Detalles</span>
                <span>Stock</span>
                <span>Price</span>
                <span>Price Oferta</span>
                <span>Actions</span>
              </div>
              {currentProducts.map((product, index) => (
                <div key={index} className="list-item">
                  <span>{product.productoId}</span>
                  <span>{product.nombre}</span>
                  <span><img src={product.imagenLink} alt={product.nombre} /></span>
                  <span> {product.marca}</span>
                  <span className='product-Descripcion'> {product.descripcion}</span>
                  <span>{product.detalles}</span>
                  <span>{product.stock}</span>
                  <span>{product.precio}</span>
                  <span>{product.precioOferta}</span>
                  <span className='actions'>
                    <Button variant="outline-success" onClick={() => handleEdit(product.productoId)}>Edit</Button>
                    <Button variant="outline-danger" onClick={() => handleDelete(product.productoId)}>Delete</Button>
                  </span>
                </div>
              ))}
            </div><Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              position="bottom" />
          </>
        )}
      </div>
      {editingProduct && (
        <ProductoModalEditor producto={editingProduct} onClose={handleCloseModal} />
      )}
    </>
  );
};


const Pagination = ({ totalPages, currentPage, onPageChange, position }:any) => {

  const maxPagesToShow = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination-container">
    {currentPage > 1 && (
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>
    )}
    {pages.map(page => (
      <button
        key={page}
        className={`pagination-button ${currentPage === page ? 'active' : ''}`}
        onClick={() => onPageChange(page)}
      >
        {page}
      </button>
    ))}
    {currentPage < totalPages && (
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Siguiente
      </button>
    )}
  </div>
);
};
