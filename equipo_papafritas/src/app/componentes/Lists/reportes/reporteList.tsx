'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './reportList.css';
import { getReporte, getReporteCompras } from '@/app/services/reporte.service';
import { iReporte, iReporteCompras } from '@/app/model/reporte';
import ReporteModal from '../../modalReporte/modalReporte';

const ITEMS_PER_PAGE = 15;
const MAX_PAGE_BUTTONS = 5;

export const ReportList = () => {
  const [reporte, setReporte] = useState<iReporte[]>([]);
  const [showReporteAux, setShowReporteAux] = useState<iReporte[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [reporteCompras, setReporteCompras] = useState<iReporteCompras[]>([]);
  const [isComprasModalOpen, setComprasModalOpen] = useState(false);

  const fetchReporte = async () => {
    try {
      const rtaReporte = await getReporte();
      if (rtaReporte) {
        const listReporte: iReporte[] = rtaReporte.data.map((rep: any) => {
          return {
            idReporte: rep.idReporte,
            idUsuario: rep.idUsuario,
            fechaReporte: rep.fechaReporte,
            montoGastado: rep.montoGastado,
          };
        });
        setReporte(listReporte)
        setShowReporteAux(listReporte)
        console.log("listReporte", listReporte);
      } else {
        console.log("No se recibieron datos del reporte.")
      }
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleButtonClick = async () => {
    await fetchReporte();
  };

  const MostrarDetalles = async (idReporte: number) => {
    try {
      const reportMap = await getReporteCompras(idReporte);
      console.log('reportMap:', reportMap)
      setComprasModalOpen(true);
      setReporteCompras(reportMap);
    } catch (error: any) {
      console.error('Error MostrarDetalles:', error);
    }
  };

  const handleCloseModal = () => {
    setComprasModalOpen(false);
    setReporteCompras([]);
  };

  useEffect(() => {
    fetchReporte();
  }, []);

  const totalPages = Math.ceil(reporte.length / ITEMS_PER_PAGE);
  const startPage = Math.max(1, currentPage - Math.floor(MAX_PAGE_BUTTONS / 2));
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_BUTTONS - 1);

  const displayedReporte = reporte.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === currentPage ? 'primary' : 'outline-primary'}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      <div className='div-container'>
        <Button variant="outline-primary" onClick={handleButtonClick}>
          Actualizar Reporte
        </Button>

        <div className="list-container">
          <div className="list-header">
            <span>ID</span>
            <span>Id Usuario</span>
            <span>Fecha</span>
            <span>Total</span>
            <span>Detalles</span>
          </div>

          {displayedReporte.map((report, index) => (
            <div key={index} className="list-item">
              <span>{report.idReporte}</span>
              <span>{report.idUsuario}</span>
              <span>{new Date(report.fechaReporte).toLocaleDateString()}</span>
              <span>{report.montoGastado}</span>
              <Button className="buttonDetalles" variant="outline-success" onClick={() => MostrarDetalles(report.idReporte)}>Detalles</Button>
            </div>
          ))}
        </div>

        {isComprasModalOpen && (
          <ReporteModal reporte={reporteCompras} onClose={handleCloseModal} />
        )}

        <div className="pagination">
          {currentPage > 1 && (
            <Button variant="outline-primary" onClick={() => handlePageChange(currentPage - 1)}>
              Anterior
            </Button>
          )}
          {renderPaginationButtons()}
          {currentPage < totalPages && (
            <Button variant="outline-primary" onClick={() => handlePageChange(currentPage + 1)}>
              Siguiente
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
