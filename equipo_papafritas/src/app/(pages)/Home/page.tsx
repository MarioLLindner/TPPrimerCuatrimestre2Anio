"use client"

import CardProducto from "@/app/componentes/cards/cardProducto/CardProducto";
import CarrouselPublicitario from "@/app/componentes/CarrouselPublicitario/CarrouselPublicitario";
import 'react-multi-carousel/lib/styles.css';
import Carpa from '../../../../Public/PescaCamping/Carpa.webp'
import CarrouselOfertas from "@/app/componentes/CarrouselOfertas/CarrouselOfertas";
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
      {/* <CardProducto
        imagen={Carpa.src}
        marca={"WaterDog"}
        descripcion="carpa 8 personas"
        precio={'$795'}
      />
      <CardProducto
        imagen={Carpa.src}
        marca={"WaterDog"}
        descripcion="carpa 8 personas"
        precio={'$795'}
      /> */}
    </>
  );
} 