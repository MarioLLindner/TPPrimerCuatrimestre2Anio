'use client'
import React, { useState, useRef} from 'react'
import './Header2.css'
import PNGLOGO from '../../../../../Public/Logos/PNG LOGO.png'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'
import AutoCloseExample from './Dropdown/Dropdown'


export const Header2 = (props : any) => {

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
        <div>
          <img className='LogoHeader' src={PNGLOGO.src} alt="CasaLindner" style={{ height: '75px', objectFit: 'contain' }} />
        </div>
        <div>
          <div className='inputHeader'>
            <input className='Buscador' type="text" placeholder="Que Desea Buscar?" />
            <button className="btn-lupa" onClick={() => SelectSearch({ filtro })}>
            </button>
            <br />
            <div className='LinksBuscador'>
              <a href="">Categorias</a>
              <a href="">Ofertas</a>
              <a href="">Historial</a>
              <a href="">Ayuda</a>
              </div>
          </div>
        </div>
        <div className='CuentaComprasCarro'>
          <a href=''>Cuenta</a>
          <a href=''>Mis compras</a>
          <button className="btn-carrito" onClick={() => goToCarrito()}>{/* {nextPage} */}</button>
        </div>
      </div>
    </>

  )
}
