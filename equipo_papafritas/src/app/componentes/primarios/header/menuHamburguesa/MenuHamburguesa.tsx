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
                    <a href="#">Categorias</a>
                    <a href="#">Ofertas</a>
                    <a href="#">Historial</a>
                    <a href="#">Ayuda</a>
                    <a href="#">Cuenta</a>
                    <a href="#">Mis Compras</a>
                    <a href="#">Carrito de Compras</a>
                </ul>
            </nav>
        </>
    )
}