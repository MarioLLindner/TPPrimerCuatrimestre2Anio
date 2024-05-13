import { AxiosResponse } from 'axios';
import clienteAxios from 'axios';
import { userID, userRegister } from '../model/UsuarioLogin';




export const login = async (usuario: any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('auth/login', usuario);
    sessionStorage.setItem('token', respuesta.data.accessToken);
    return respuesta.data;
  } catch (err) {
    throw new Error('Error en el login');
  }
}
//URL PARA BASE DE DATOS DE USUARIOS EN /API/USERS-------------------------
export const putUserRegister = async (usuario: userRegister) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.put('/api/users', usuario);
    return respuesta.data
  } catch (error) {
    throw new Error('Error al registrarse')
  }
}

export const patchUser = async (usuario: userRegister) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.patch(`/api/users/${usuario.email}`, usuario)
    return respuesta.data;
  } catch (error) {
    throw new Error('Error al intentar actualizar el usuario');
  }
}

export const deleteUser = async (usuario: userID) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.delete('/api/users' + usuario)
    return respuesta.data;
  } catch (error) {
    throw new Error('Error al intentar actualizar el usuario');
  }
}