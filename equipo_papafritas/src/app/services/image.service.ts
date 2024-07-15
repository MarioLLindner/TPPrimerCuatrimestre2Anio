import { AxiosResponse } from 'axios';
import clienteAxios from 'axios';

export const postImage = async (imagen:FormData) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/images/upload', imagen);
    return respuesta.data
  } catch (error) {
    console.log('error en imagen.service front', error)
    throw new Error('Error al subir imagen')
  }
}