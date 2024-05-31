import React from 'react';
import "./CardProducto.css";
import {CardRubro} from './CardRubro';
import 'bootstrap/dist/css/bootstrap.min.css';

export function ContCardProducto ( props: any ) {
    const {
        CardImg,
        CardName,
        CardDescripcionRubro
    } = props;
    return (

    <div className="containerCard">
      <div className="row">
        <CardRubro/>
      </div>
    </div>
  );
}