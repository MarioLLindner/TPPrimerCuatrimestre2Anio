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
            <a href="">Categorias</a>
            <a href="">Ofertas</a>
            <a href="">Historial</a>
            <a href="">Ayuda</a>
          </div>

        </div>


        <div className='HeaderRight'>
          <a href=''>Cuenta</a>
          <a href=''>Mis compras</a>
          <button className="btn-carrito" onClick={() => goToCarrito()}>{/* {nextPage} */}</button>
        </div>
      </div>
    </>

  )
}
