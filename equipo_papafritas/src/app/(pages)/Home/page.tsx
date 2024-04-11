"use client"

import CardProducto from "@/app/componentes/cards/cardProducto/CardProducto";
import ControlledCarousel from "@/app/componentes/carrousel/Carrousel";
import 'react-multi-carousel/lib/styles.css';
import Carpa from '../../../../Public/PescaCamping/Carpa.webp'


export default function Home() {
  return (
    <>
      <ControlledCarousel />
       <br></br>

      <CardProducto
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
      />
    </>
  );
} 