'use client'
import React, { useState, useRef } from 'react'
import './Header2.css'
import PNGLOGO from '../../../../../Public/Logos/PNG LOGO.png'
import { useRouter, usePathname } from 'next/navigation'
import { MenuHamburguesa } from './menuHamburguesa/MenuHamburguesa'
import { withRolesComponets } from '../../HOC/hoc.viewPermission'
import HeaderLink from './whitRolesComponet/whitRolesComponet'



export const Header2 = (props: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const goHome = () => {
    if (pathname !== '/home')
      router.push('home')
  }



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
            <a href="../../">historial</a>
            <a href="../../login">cuenta</a>
          </div>
        </div>

        <div className='HeaderRight'>
          <HeaderLink href="../../login" text="Cuenta" roles={[1]} />
          <HeaderLink href="../../login" text="Mis compras" roles={[1]} />
          <HeaderLink href="../../shoppingCart" text="Carrito" roles={[1]}/>
        </div>
      </div>
    </>

  )
}
