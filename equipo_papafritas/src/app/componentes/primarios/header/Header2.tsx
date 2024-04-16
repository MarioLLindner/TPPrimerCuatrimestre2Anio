'use client'
import React, { useState, useRef } from 'react'
import './Header2.css'
import PNGLOGO from '../../../../../Public/Logos/PNG LOGO.png'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import { MenuHamburguesa } from './menuHamburguesa/MenuHamburguesa'



export const Header2 = (props: any) => {

  /*    const {url, nextPage} = props;
     const ruta= url;
     const router = useRouter();
     const pathname = usePathname();
 
       const goToCarrito = () => {
         if (pathname !== ruta)
           router.push(ruta)
       } */

  return (
    <>
      <div className='container-Header'>
        <div className='HeaderLeft'>
          <img className='LogoHeader' src={PNGLOGO.src} alt="CasaLindner" style={{ height: '75px', objectFit: 'contain' }} />
          <div className='HeaderRightAux'>
              <MenuHamburguesa />
            </div>
        </div>
        <div className='HeaderMid'>
          <div className='HeaderMid2'>
            <div className='inputHeader'>
              <input className='Buscador' type="text" placeholder="Que Desea Buscar?" />
              <button className="btn-lupa" onClick={() => SelectSearch({ filtro })}>
              </button>
              
            </div>
          </div>

          <div className='LinksBuscador'>
            <a href="../../product">Categorias</a>
            <a href="../../product">Ofertas</a>
            <a href="../../login">Historial</a>
            <a href="../../">Ayuda</a>
          </div>

        </div>


        <div className='HeaderRight'>
          <a href='../../login'>Cuenta</a>
          <a href='../../login'>Mis compras</a>
          <a className="btn-carrito" href='../../shoppingCart'></a>
        </div>
      </div>
    </>

  )
}
