import React from 'react';
import { iReporteCompras } from '@/app/model/reporte';
/* import './modalReporte.css'; */

interface ReporteModalProps {
  reporte: iReporteCompras[];
  onClose: () => void;
}

const ReporteModal: React.FC<ReporteModalProps> = ({ reporte, onClose }) => {
  return (
    <div className="modal-background">
      <div className="register-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Detalle Reporte</h2>
        <div className="reporte-detalle">
          {reporte.map((compra) => (
            <div key={compra.idCompra} className="reporte-item">
              <p>ID Compra: {compra.idCompra}</p>
              <p>ID Reporte: {compra.idReporte}</p>
              <p>ID Producto: {compra.idProducto}</p>
              <p>Cantidad: {compra.cantidad}</p>
              <p>Precio Unitario: {compra.precioUnitario}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReporteModal;
