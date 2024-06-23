import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';

const ProductCard = ({ producto }) => {
  return (
    <div className="product-card">
      <img src={producto.imagenLink} alt={producto.nombre} className="product-image" />
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        <p className="product-description">{producto.descripcion}</p>
        {producto.precioOferta ? (
          <div className="product-pricing">
            <p className="original-price">${producto.precio}</p>
            <p className="discounted-price">${producto.precioOferta}</p>
          </div>
        ) : (
          <p className="product-price">${producto.precio}</p>
        )}
        <p className="product-details">{producto.detalles}</p>
        <button className="buy-now-button">Comprar ahora</button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  producto: PropTypes.shape({
    productoId: PropTypes.any.isRequired,
    nombre: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    imagenLink: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    precioOferta: PropTypes.number,
    detalles: PropTypes.string.isRequired,
  }).isRequired
};

export default ProductCard;
