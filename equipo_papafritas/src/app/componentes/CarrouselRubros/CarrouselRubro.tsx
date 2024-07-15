'use client'
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import RubroCard from '../cards/cardRubro/RubroCard';


function CarrouselRubros() {

  const rubros = [
    { url: '#', name: 'Camas,Sommiers y Colchones', image: 'https://sommiercenter.com/media/catalog/product/l/u/luz_160.jpg?width=700&height=700&canvas=700,700&optimize=high&bg-color=255,255,255&fit=bounds' },
    { url: '#', name: 'Muebles', image: 'https://acdn.mitiendanube.com/stores/865/441/products/biblioteca-moscu-factorymuebles1-bffa01f90abbcfaaf016208298401629-640-0.jpg' },
    { url: '#', name: 'Electrodomesticos', image: 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2020/12/11-mitos-electrodomesticos-hora-dejes-creerte-2157733.jpg?tf=3840x' },
    { url: '#', name: 'Pesca y Camping', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUopm5-PBkoGJajwtGaLafHgurnJY5o-Zo8w&s' },
    { url: '#', name: 'Ropa de Blanco', image: 'https://ondablanca.com.ar/img/slide-02.jpg' },
  ];

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
      
      {rubros.map((rubro, index)=>(
        <RubroCard key={index} {...rubro}/>
      ))}
    </Carousel>
  )
}

export default CarrouselRubros;
