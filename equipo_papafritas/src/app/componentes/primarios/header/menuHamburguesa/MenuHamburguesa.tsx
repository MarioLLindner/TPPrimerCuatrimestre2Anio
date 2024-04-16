"use client"
import React from 'react'
import './MenuHamburguesa.css'
export const MenuHamburguesa = () => {
    return (
        <>
            <nav className='Burguer'>
                <input type="checkbox" id="menu"></input>
                <label htmlFor="menu"> ☰ Menu </label>
                <ul>
                    <a href="../../product">Categorias</a>
                    <a href="../../product">Ofertas</a>
                    <a href="../../login">Historial</a>
                    <a href="../../product">Ayuda</a>
                    <a href="../../login">Cuenta</a>
                    <a href="../../login">Mis Compras</a>
                    <a href="../../shoppingCart">Carrito de Compras</a>
                </ul>
            </nav>
        </>
    )
}