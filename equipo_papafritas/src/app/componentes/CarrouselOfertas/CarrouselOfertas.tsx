'use client'
import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { get5ProductosRandom } from '@/app/services/producto.service';
import { iProducto } from '@/app/model/CardProducto';
import CardOferta from '../cards/cardOferta/cardOferta';

function CarrouselOfertas() {

  const [products, setProducts] = useState<iProducto[]>([]);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await get5ProductosRandom()
        console.log(response)
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };
    fetchProductos();
  }, []);


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

      {products.map((products)=> (
      <CardOferta
      urlProducto={`/product/${products.productoId}`}
        imagenLink={products.imagenLink}
        nombre={products.nombre}
        Precio={products.precio}
      />
      ))}
    </Carousel>
  )
}

export default CarrouselOfertas;
