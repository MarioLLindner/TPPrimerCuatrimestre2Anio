'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userList.css';
import { getAllProductos } from '@/app/services/producto.service';
import { iProducto } from '@/app/model/CardProducto';

export const UserList = () => {
  const [showUsers, setShowUsers] = useState(true);
  const users = [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
      phone: '123-456-7890',
      province: 'Province 1',
      city: 'City 1',
      postalCode: '12345',
      address: '123 Main St'
    },
    {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      password: 'password456',
      confirmPassword: 'password456',
      phone: '098-765-4321',
      province: 'Province 2',
      city: 'City 2',
      postalCode: '67890',
      address: '456 Elm St'
    }
  ];

  const handleButtonClick = () => {
    setShowUsers(!showUsers);
  };

  const handleEdit = (index: any) => {
    console.log('Edit user', index);
  };

  const handleDelete = (index: any) => {
    console.log('Delete user', index);
  };

  return (
    <>
      <div>
        <Button variant="outline-primary" onClick={handleButtonClick}>{showUsers ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}</Button>
        {showUsers && (
          <div className="list-container">
            <div className="list-header">
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
            {users.map((user, index) => (
              <div key={index} className="list-item">
                <span>{user.firstName} </span>
                <span>{user.lastName}</span>
                <span>{user.email}</span>
                <span>{user.phone}</span>
                <span>{user.province}</span>
                <span>{user.city}</span>
                <span>{user.postalCode}</span>
                <span>{user.address}</span>
                <span className="actions">
                  <Button variant="outline-success" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};



export const ProductList = () => {
  const [product, setProducts] = useState<iProducto[]>([]);
  const [showProductsAux, setShowProductsAux] = useState<iProducto[]>([]);
  const [showProducts, setShowProducts] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const rtaProduct = await getAllProductos();
      const listProduct: iProducto[] = rtaProduct.data.map((prod: any) => {
        return {
          productoId: prod.productoId,
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          imagenLink: prod.imagenLink,
          detalles: prod.detalles,
          precio: prod.precio,
          precioOferta: prod.precioOferta,
        };
      });
      setProducts(listProduct)
      setShowProductsAux(listProduct)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleButtonClick = () => {
    setShowProducts(!showProducts);
  };
  const handleDelete = (index: any) => {
    console.log('Delete product', index);
  };

  const handleEdit = (productoId: number) => {
    const productToEdit = product.find(p => p.productoId === productoId);
    alert(`id de producto a editar:${productToEdit?.productoId}`);
    console.log("Editando producto:", productToEdit?.productoId);
    // Lógica de edición...
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
              <span>Name</span>
              <span>Image</span>
              <span>Brand</span>
              <span>Description</span>
              <span>Price</span>
              <span>Actions</span>
            </div>
            {product.map((product, index) => (
              <div key={index} className="list-item">
                <span>{product.productoId}</span>
                <span>{product.nombre}</span>
                <span><img src={product.imagenLink} alt={product.nombre} /></span>
                <span> {product.descripcion}</span>
                <span>{product.detalles}</span>
                <span>{product.precio}</span>
                <span>{product.precioOferta}</span>
                <span className='actions'>
                <Button variant="outline-success" onClick={() => handleEdit(product.productoId)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
