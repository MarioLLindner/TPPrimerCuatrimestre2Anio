import React from "react";
import "./CardProductoCarrito.css";
import PropTypes from 'prop-types';
import { iProducto } from "@/app/model/CardProducto";

interface CardProductoCarritoProps {
  producto: iProducto;
  onDelete: (productoId: number) => void;
}

const CardProductoCarrito: React.FC<CardProductoCarritoProps> = ({ producto, onDelete }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={producto.imagenLink} alt={producto.nombre} className="product-image" />
      </div>
      <div className="product-info">
        <h3 className="product-title">{producto.nombre}</h3>
        <div className="product-pricing">
          <p className="product-priceOfert">
          {producto.precioOferta > 0 && `$${producto.precioOferta}`}
            </p>
          <p className="product-price" style={{ textDecoration: producto.precioOferta > 0 ? 'line-through' : 'none' }}> 
            ${producto.precio}
          </p>
        </div>
        <button className="remove-button" onClick={() => onDelete(producto.productoId)}>Eliminar</button>
      </div>
    </div>
  );
};

CardProductoCarrito.propTypes = {
  producto: PropTypes.shape({
    productoId: PropTypes.any.isRequired,
    nombre: PropTypes.string.isRequired,
    imagenLink: PropTypes.string.isRequired,
    marca: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    detalles: PropTypes.string.isRequired,
    precio: PropTypes.number.isRequired,
    precioOferta: PropTypes.number,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default CardProductoCarrito;
