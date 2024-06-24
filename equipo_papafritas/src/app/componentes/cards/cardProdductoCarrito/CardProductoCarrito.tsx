/* 
https://tinyurl.com/ffWishlistProductCard 
*/
import React from "react";
import "./CardProductoCarrito.css";
import PropTypes from 'prop-types';

const CardProductoCarrito = ({ producto }) => {
    return (
        <div className="product-card">
            <div className="product-image-container">
                <img src={producto.imagenLink} alt={producto.nombre} className="product-image" />
            </div>
            <div className="product-info">
                <h3 className="product-title">{producto.nombre}</h3>
                {producto.descripcion && <p className="product-description">{producto.descripcion}</p>}
                <div className="product-pricing">
                    <p className="product-price">${producto.precio}</p>
                </div>
                <button className="remove-button">Eliminar</button>
            </div>
        </div>
        
    );
};

CardProductoCarrito.propTypes = {
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

export default CardProductoCarrito;
