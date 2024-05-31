"use client"
import CarrouselPublicitario from "@/app/componentes/CarrouselPublicitario/CarrouselPublicitario";
import CarrouselOfertas from "@/app/componentes/CarrouselOfertas/CarrouselOfertas";
import CarrouselRubros from "@/app/componentes/CarrouselRubros/CarrouselRubro";
import 'react-multi-carousel/lib/styles.css';
import './home.css';

export default function Home() {
  return (
    <>
      <div className="ContenedorCarouselPublicitario">
        <CarrouselPublicitario />
      </div>
      <br></br>
      <br></br>

      <div className="ContenedorCarouselOfertas">
        <h1>OFERTAS DEL MES</h1>
        <CarrouselOfertas />
      </div>
      <br></br>
      <div className="ContenedorCarouselOfertas">
        <h1>NUESTROS RUBROS MAS ELEGIDOS</h1>
        <CarrouselRubros/>
      </div>
      <br></br>
      <br></br>
    </>
  );
} 