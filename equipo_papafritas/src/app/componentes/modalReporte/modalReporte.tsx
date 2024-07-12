
import { iReporteCompras } from '@/app/model/reporte';
/* import './modalReporte.css'; */


const ReporteModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {


  return (
    <div className="modal-background">
      <div className="register-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Detalle Reporte</h2>
        
      </div>
    </div>
  );
};

export default ReporteModal;
