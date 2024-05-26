'use client'
import React, { useState, useEffect } from 'react'
import './Header2.css'
import PNGLOGO from '../../../../../Public/Logos/PNG LOGO.png'
import { useRouter, usePathname } from 'next/navigation'
import { MenuHamburguesa } from './menuHamburguesa/MenuHamburguesa'
import HeaderLink from './whitRolesComponet/whitRolesComponet'



export const Header2 = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const goHome = () => {
    if (pathname !== '/home')
      router.push('home')
  }

  const cerrarSesion = () => {
    localStorage.clear()
    if (pathname !== '/home')
      router.push('home')
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Establecer isLoggedIn en true si hay un token
  }, []);

  return (
    <>
      <div className='container-Header'>
        <div className='HeaderLeft'>
          <img className='LogoHeader' src={PNGLOGO.src} alt="CasaLindner" onClick={goHome} style={{ height: '75px', objectFit: 'contain' }} />
          <div className='HeaderRightAux'>
            <MenuHamburguesa />
          </div>
        </div>
        <div className='HeaderMid'>
          <div className='HeaderMid2'>
            <div className='inputHeader'>
              <input className='Buscador' type="text" placeholder="Que Desea Buscar?" />
              <button className="btn-lupa" /* onClick={() => SelectSearch({ filtro })} */>
              </button>
            </div>
          </div>
          <div className='LinksBuscador'>
            <a href="../../product">Categorias</a>
            <a href="../../product">Ofertas</a>
            <a href="../../shoppingCart">Carrito de Compras</a>
            <a href="../../login">Cuenta</a>
          </div>
        </div>

        <div className='HeaderRight'>
          <HeaderLink href="../../admin" text="Administración" roles={[1]} />
          {isLoggedIn && (
            <button onClick={cerrarSesion} className="btn-cerrar-sesion">Cerrar Sesión</button>
          )}
        </div>
      </div>
    </>

  )
}
