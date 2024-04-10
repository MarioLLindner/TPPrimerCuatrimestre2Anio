/* 
https://tinyurl.com/ffWishlistProductCard 
*/
import React from "react";
import "./CardProducto.css";

function CardProducto(props:any) {
    const { imagen, descripcion, marca, precio } = props;

    return (
        <a className="product-card" href="#">
            <img className="product-imagen" src={imagen} />
            <p className="product-marca">{marca}</p>
            <p className="product-descripcion">{descripcion}</p>
            <p className="product-precio">{precio}</p>
        </a>
    );
}

export default CardProducto;
