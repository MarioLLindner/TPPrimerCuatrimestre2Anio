import React from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import { addToCart } from '@/app/services/producto.service';



const añadirCarrito = async (productoId: number) => {
  const jwt = require('jsonwebtoken');
  try {
    const token = localStorage.getItem('token')
    const userId: number | null = jwt.decode(token).usuario.userId;
    if (userId) {
      await addToCart(productoId, userId)
    }
    console.log('producto | user ID');
    console.log(productoId + '|' + userId);
  } catch (error) {
    console.log('error añadiendo producto a carrito:', error)
  }
}

const ProductCard = ({ producto }) => {
  return (
    <div className="product-card">
      <img src={producto.imagenLink} alt={producto.nombre} className="product-image" />
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        {producto.precioOferta ? (
          <div className="product-pricing">
            <p className="original-price">${producto.precio}</p>
            <p className="discounted-price">${producto.precioOferta}</p>
          </div>
        ) : (
          <p className="product-price">${producto.precio}</p>
        )}
        <button className="buy-now-button" onClick={() => { añadirCarrito(producto.productoId) }}>
          Comprar ahora</button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  producto: PropTypes.shape({
    productoId: PropTypes.any.isRequired,
    nombre: PropTypes.string.isRequired,
    imagenLink: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    precioOferta: PropTypes.number,
  }).isRequired
};

export default ProductCard;
