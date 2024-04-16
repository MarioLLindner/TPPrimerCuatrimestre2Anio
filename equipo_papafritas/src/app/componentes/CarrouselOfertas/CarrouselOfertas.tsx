'use client'
import React from 'react';
import Carousel from 'react-multi-carousel';

import 'react-multi-carousel/lib/styles.css';

import Carpa from '../../../../Public/PescaCamping/Carpa.webp';
import CardProducto from '../cards/cardProducto/CardProducto';

function CarrouselOfertas() {

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlaySpeed={3000}
      centerMode={false}
      className=""
      containerClass="container"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite={false}
      itemClass=""
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      responsive={{
        desktop: {
          breakpoint: {
            max: 3000,
            min: 1024
          },
          items: 5,
          partialVisibilityGutter: 40
        },
        mobile: {
          breakpoint: {
            max: 464,
            min: 0
          },
          items: 1,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: {
            max: 1024,
            min: 464
          },
          items: 2,
          partialVisibilityGutter: 30
        }
      }}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots={false}
      sliderClass=""
      slidesToSlide={1}
      swipeable
    >
      
        {/* AGEGAR JS CON LAS IMAGENES DE LAS OFERTAS */}
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
    </Carousel>
  )
}

export default CarrouselOfertas;