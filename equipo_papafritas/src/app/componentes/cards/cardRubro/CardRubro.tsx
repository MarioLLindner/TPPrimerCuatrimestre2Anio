import React from "react";
import "./CardRubro.css";
import { useRouter } from "next/navigation";

function CardRubro(props:any) {
    const { CardImg, CardDescripcionRubro, CardName } = props;
    const router = useRouter();
    const GoToRubro = () => {
        router.push('./product')
    }
    return (
        <a className="product-card" href="#">
            <img className="product-imagen" src={CardImg} />
            <p className="product-marca">{CardName}</p>
            <p className="product-descripcion">{CardDescripcionRubro}</p>
            <button>Ver Mas</button>
        </a>
    );
}

export default CardRubro;