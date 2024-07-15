"use client"
import CarrouselPublicitario from "@/app/componentes/CarrouselPublicitario/CarrouselPublicitario";
import CarrouselOfertas from "@/app/componentes/CarrouselOfertas/CarrouselOfertas";
import CarrouselRubros from "@/app/componentes/CarrouselRubros/CarrouselRubro";
import 'react-multi-carousel/lib/styles.css';
import './home.css';
import WhatsAppButton from "@/app/componentes/whatsappButton/WhatsappButton";

export default function Home() {

  const phoneNumber = '2284664116';
  return (
    <>
      <div className="ContenedorCarouselPublicitario">
        <CarrouselPublicitario />
      </div>
      <br></br>
      <br></br>

      <div className="ContenedorCarouselOfertas">
        <h1 className="flame-title">OFERTAS POR 24 HS</h1>
        <CarrouselOfertas />
      </div>
      <br></br>
      <div className="ContenedorCarouselOfertas">
        <h1 className="flame-title">NUESTROS RUBROS PRINCIPALES</h1>
        <CarrouselRubros/>
      </div>
      <br></br>
      <br></br>
      <WhatsAppButton phoneNumber={phoneNumber} />
    </>
  );
} 