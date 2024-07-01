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

      window.addEventListener("keyup", function(event){
        var codigo = event.keyCode || event.which;
        if (codigo == 27){
            setProductModalOpen(false);
        }
    }, false);

      const handleUserClick = () => {
        setUserModalOpen(true);
      };

      window.addEventListener("keyup", function(event){
        var codigo = event.keyCode || event.which;
        if (codigo == 27){
            setUserModalOpen(false);
        }
    }, false);

    const handleProductCloseModal = () => {
        setProductModalOpen(false);
      };

      const handleUserCloseModal = () => {
        setUserModalOpen(false);
      };

    return (
        <>
            <div className='crudSuperior'>
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