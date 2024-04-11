'use client'
import React from 'react'
import './Carrousel.css'

export const CarrouselItem = (props: any) => {
  const {imgSrc,altText} = props;
  return (
    <>
      <img
        className="imagenCarrousel"
        src={imgSrc}
        alt={altText}
      />
    </>
  )
}