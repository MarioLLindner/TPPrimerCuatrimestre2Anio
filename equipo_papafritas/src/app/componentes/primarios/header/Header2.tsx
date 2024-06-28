'use client'
import './Header2.css'
import React, { useState, useEffect } from 'react'
import PNGLOGO from '../../../../../Public/Logos/PNG LOGO.png'
import { useRouter, usePathname } from 'next/navigation'
import { MenuHamburguesa } from './menuHamburguesa/MenuHamburguesa'
import HeaderLink from './whitRolesComponet/whitRolesComponet'


export const Header2 = (props: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  
  const goHome = () => {
    if (pathname !== '/home')
      router.push('home')
  }

  const cerrarSesion = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    if (pathname !== '/login'){
      router.push('/login')}
  }

  const login = () => {
    if ( pathname !== '/login'){
      router.push('/login')}
 
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedIn(false)
    } else {
      setIsLoggedIn(true);
      if (pathname === '/login') {
        router.push('/home');
      }
    }
  }, [pathname, router]);
  
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        const jwt = require('jsonwebtoken');
        const admin = jwt.decode(localStorage.getItem('token')).usuario.admin
        if (admin === 0 || admin == null) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      } else {
        setIsVisible(true);
      }
    }, [pathname, router]);

  return (
    <>
      <div className='container-Header'>
        <div className='HeaderLeft'>
          <img className='LogoHeader' src={PNGLOGO.src} alt="CasaLindner" onClick={goHome} style={{ height: '75px', objectFit: 'contain' }} />
          <div className='HeaderRightAux'>
            <MenuHamburguesa />
          </div>
        </div>
        {isVisible && (
          <div className='HeaderMid'>
            <div className='HeaderMid2'>
              <div className='inputHeader'>
                <input className='Buscador' type="text" placeholder="Que Desea Buscar?" />
                <button className="btn-lupa" /* onClick={() => SelectSearch({ filtro })} */>
                </button>
              </div>
            </div>
            <div className='LinksBuscador'>
              <a href="../../home">Inicio</a>
              <a href="../../product">Categorias</a> 
              <a href="../../shoppingCart">Carrito</a>
              <a href="../../product">Quienes Somos?</a>
            </div>
          </div>
        )}


        <div className='HeaderRight'/*poner un min width*/>
          <HeaderLink href="../../admin" text="Administración" roles={[1]} />
          {!isLoggedIn && pathname !== '/login' &&(
            <button onClick={login} className="btn-cerrar-sesion">Ingresar</button>
            
          )}
          {isLoggedIn && (
            <button onClick={cerrarSesion} className="btn-cerrar-sesion">Cerrar Sesión</button>
          )}
        </div>
      </div>
    </>
  )
}
