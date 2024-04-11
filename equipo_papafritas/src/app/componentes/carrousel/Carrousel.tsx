'use client'
import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { imagenesCarrousel } from '../../../../Public/Carrousel/carrousel';
import { CarrouselItem } from './CarrouselItem';

function ControlledCarousel() {
  const responsive = {
    superLargeDesktop: {

      breakpoint: { max: 4000, min: 3000 },
      items: 5
    }
  };

  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={1000}
      centerMode={false}
      className=""
      containerClass="container-with-dots"
      dotListClass=""
      draggable
      focusOnSelect={false}
      infinite
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
          items: 1,
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
          items: 1,
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
      transitionDuration={3000}
    >
      <CarrouselItem
        imgSrc={imagenesCarrousel.Bicicletas.src} />
      <CarrouselItem
        imgSrc={imagenesCarrousel.Colchones.src} />
      <CarrouselItem
        imgSrc={imagenesCarrousel.Electro.src} />
      <CarrouselItem
        imgSrc={imagenesCarrousel.Hogar.src} />
      <CarrouselItem
        imgSrc={imagenesCarrousel.Muebles.src} />
      <CarrouselItem
        imgSrc={imagenesCarrousel.Pesca.src} />
    </Carousel>
  )
}

export default ControlledCarousel;
