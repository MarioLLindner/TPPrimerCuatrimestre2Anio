/* import React from 'react';
import './cardOferta.css';

interface CardOfertaProps {
  imagenLink: string;
  Precio: number;
  nombre: string;
  urlProducto: string;
}

const convertirPrecio = (precioStr: any) => {
  const precioString = String(precioStr);
  const precioNumerico = parseInt(precioString.replace(/[^0-9.-]+/g, ""));
  return isNaN(precioNumerico) ? 0 : precioNumerico;
};

const CardOferta: React.FC<CardOfertaProps> = ({ imagenLink, Precio, nombre, urlProducto }) => {
  const precioNumerico = convertirPrecio(Precio);
  const descuento = 0.1;
  const PrecioOferta = Math.ceil(precioNumerico * (1 - descuento));
  return (
    <a href={urlProducto} className="card-link">
      <div className="card">
        <img src={imagenLink} alt={nombre} className="card-image" />
        <div className="card-content">
          <h3 className="product-name">{nombre}</h3>
          <p className="price">
            <span className="price-original">${precioNumerico.toFixed(2)}</span>
            <span className="price-offer">${PrecioOferta}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default CardOferta; */

import React from 'react';
import './cardOferta.css';

const convertirPrecio = (precioStr: any) => {
  const precioString = String(precioStr);
  const precioNumerico = parseInt(precioString.replace(/[^0-9.-]+/g, ""));
  return isNaN(precioNumerico) ? 0 : precioNumerico;
};

const CardOferta = ({ imagenLink, Precio, nombre, urlProducto }) => {
  const precioNumerico = convertirPrecio(Precio);
  const descuento = 0.1;
  const PrecioOferta = Math.ceil(precioNumerico * (1 - descuento));
  return (
    <a href={urlProducto} className="card-link">
      <div className="card">
        <img src={imagenLink} alt={nombre} className="card-image" />
        <div className="card-content">
          <h3 className="product-name">{nombre}</h3>
          <p className="price">
            <span className="price-original">${precioNumerico.toFixed(2)}</span>
            <span className="price-offer">${PrecioOferta}</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default CardOferta;

