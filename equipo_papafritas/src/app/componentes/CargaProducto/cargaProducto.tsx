"use client"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cargaProducto.css'
import { ProductList, UserList } from '../Lists/Users/userList';
import { useState } from "react";
import  ProductoModal  from '../modalProducto/modalProducto'
import RegisterModal from '../modalRegistro/modalRegistro';


export const PermisosAdmin = () => {

    const [isProductModalOpen, setProductModalOpen] = useState(false);
    const [isUserModalOpen, setUserModalOpen] = useState(false);

    const handleProductClick = () => {
        setProductModalOpen(true);
      };

      const handleUserClick = () => {
        setUserModalOpen(true);
      };

    const handleProductCloseModal = () => {
        setProductModalOpen(false);
      };

      const handleUserCloseModal = () => {
        setUserModalOpen(false);
      };

    return (
        <>
            <div>
                <div className='crudGeneral'>
                    <div className="crud">
                        <h2>Productos</h2>
                        <Button variant="outline-primary" onClick={handleProductClick}>Cargar Producto</Button>{' '}
                        {isProductModalOpen && <ProductoModal onClose={handleProductCloseModal} />}
                    </div>
                    <div className="crud">
                        <h2>Usuario</h2>
                        <Button variant="outline-primary" onClick={handleUserClick}>Cargar Usuario</Button>{' '}
                        {isUserModalOpen && <RegisterModal onClose={handleUserCloseModal} />}
                    </div>
                </div>
                <div>
                <UserList/>
                <ProductList/>
                </div>
            </div>

        </>

    )
}