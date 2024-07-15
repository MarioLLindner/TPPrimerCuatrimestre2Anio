"use client"
import './Login.css'
import { Login } from '../../componentes/login/login'
import WhatsAppButton from '@/app/componentes/whatsappButton/WhatsappButton';

export default function Home() {

  const phoneNumber = '2284664116';

  return (
    <>
      <div className='HomeLogin'>
        <Login />
      </div>
      <WhatsAppButton phoneNumber={phoneNumber} />
    </>
  );
} 