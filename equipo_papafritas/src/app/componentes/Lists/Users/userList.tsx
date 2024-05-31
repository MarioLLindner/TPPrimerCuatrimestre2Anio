'use client'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userList.css';

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
  
    const handleEdit = (index) => {
      console.log('Edit user', index);
    };
  
    const handleDelete = (index) => {
      console.log('Delete user', index);
    };
  
    return (
      <div>
        <Button variant="outline-primary" onClick={handleButtonClick}>{showUsers ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}</Button>
        {showUsers && (
          <ul className="list-vertical">
            {users.map((user, index) => (
              <li key={index} className="list-item">
                <div className="list-item-horizontal">
                  <h2>{user.firstName} {user.lastName}</h2>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Province: {user.province}</p>
                  <p>City: {user.city}</p>
                  <p>Postal Code: {user.postalCode}</p>
                  <p>Address: {user.address}</p>
                  <Button variant="outline-success" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };


  export const ProductList = () => {
    const [showProducts, setShowProducts] = useState(false);
    const products = [
      {
        name: 'Product 1',
        image: 'https://via.placeholder.com/50',  // ejemplo de imagen
        brand: 'Brand 1',
        description: 'Description 1',
        price: '$10'
      },
      {
        name: 'Product 2',
        image: 'https://via.placeholder.com/50',  // ejemplo de imagen
        brand: 'Brand 2',
        description: 'Description 2',
        price: '$20'
      }
    ];
  
    const handleButtonClick = () => {
      setShowProducts(!showProducts);
    };
  
    const handleEdit = (index) => {
      console.log('Edit product', index);
    };
  
    const handleDelete = (index) => {
      console.log('Delete product', index);
    };
  
    return (
      <div>
        <Button variant="outline-primary" onClick={handleButtonClick}>{showProducts ? 'Ocultar Productos' : 'Mostrar Productos'}</Button>
        {showProducts && (
          <ul className="list-vertical">
            {products.map((product, index) => (
              <li key={index} className="list-item">
                <div className="list-item-horizontal">
                  <h2>{product.name}</h2>
                  <img src={product.image} alt={product.name} />
                  <p>Brand: {product.brand}</p>
                  <p>Description: {product.description}</p>
                  <p>Price: {product.price}</p>
                  <Button variant="outline-success" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(index)}>Delete</Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };