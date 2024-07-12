import { AxiosResponse } from 'axios';
import clienteAxios from 'axios';
import { iReporte, iReporteCompras } from '../model/reporte';

export const postReporte = async (reporte:iReporte) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/reporte', reporte);
    return respuesta.data
  } catch (error) {
    console.log('error en reporte.service:', error)
    throw new Error('Error al publicar reporte')
  }
}

export const getReporte = async () => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/reporte');
    if (respuesta) {
      return respuesta;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error en reporte.service:', error)
    throw new Error('Error al traer reporte')
  }
}

export const countReportes = async() =>{
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/reporte/count');
    if (respuesta) {
      return respuesta;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error en reporte.service:', error)
    throw new Error('Error al traer reporte')
  }
}



export const postCompras = async (reporteCompras:iReporteCompras[]) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/reporte/compra', reporteCompras);
    return respuesta.data
  } catch (error) {
    console.log('error en reporte.service:', error)
    throw new Error('Error al publicar reporte')
  }
}