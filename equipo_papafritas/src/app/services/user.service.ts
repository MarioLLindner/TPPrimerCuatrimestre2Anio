
import { AxiosResponse } from 'axios';
import clienteAxios from 'axios';
import { userRegister } from '../model/UsuarioLogin';



export const login = async (usuario: any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/auth/login', usuario);
    localStorage.clear();
    localStorage.setItem('token', respuesta.data.accessToken);
    if (respuesta.status == 401 || respuesta.status == 404 || respuesta.status == 204 ) {
      alert('invalid user or password ')
     /*  throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED) */
    }

    if (respuesta.status == 201) {
      return respuesta.data;
    }
  } catch (err) {
    console.log('ERROR', err);
    /* throw new Error('Error en el login'); */
  }
}


//crear usuario
export const postUserRegister = async (usuario: userRegister) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/user', usuario);
    return respuesta
  } catch (error) {
    console.log('error en user.service', error)
    throw new Error('Error al registrarse')

  }
}

/* export const patchUser = async (usuario: userRegister) => {
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
} */