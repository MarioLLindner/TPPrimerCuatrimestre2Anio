import React from 'react';
import { iReporteCompras } from '@/app/model/reporte';
import './modalReporte.css';

interface ReporteModalProps {
  reporte: iReporteCompras[];
  onClose: () => void;
}

const ReporteModal: React.FC<ReporteModalProps> = ({ reporte, onClose }) => {
  return (
    <div className="modal-background">
      <div className="reporte-modal">
        <div className="header-modal"> 
        <h2>Detalle Reporte</h2>
        <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="list-container">
          <div className="list-header">
            <span>ID Compra</span>
            <span>Id Reporte</span>
            <span>Producto</span>
            <span>Cantidad</span>
            <span>Precio Producto</span>
          </div>
          {reporte.map((compra) => (
            <div key={compra.idCompra} className="list-item">
              <span>{compra.idCompra}</span>
              <span>{compra.idReporte}</span>
              <span>{compra.idProducto}</span>
              <span>{compra.cantidad}</span>
              <span>{compra.precioUnitario}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReporteModal;
