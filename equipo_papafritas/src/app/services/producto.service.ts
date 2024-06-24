import { Axios, AxiosResponse } from 'axios';
import clienteAxios from 'axios';
import { iProducto } from '../model/CardProducto';


//get all productos 
export const getAllProductos = async () => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos')
    return respuesta;
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al traer todos los productos')
  }
}

//Get 5 produtctos Random
export const get5ProductosRandom = async () => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos/random');
    return respuesta;
  } catch (error) {
    console.log('No se pudo obtener 5 productos random', error)
    throw new Error('Error al traer 5 Productos')
  }
}

//crear producto
export const postProducto = async (producto: iProducto) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/productos', producto);
    return respuesta
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al crear producto')
  }
}

//editar productos
export const putProducto = async (producto: iProducto) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.put('http://localhost:8080/api/productos', producto);
    return respuesta
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al editar producto')
  }
}


//eliminar producto
export const deleteProducto = async (producto: iProducto) => {
  console.log('producto id front:', producto)
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.delete('http://localhost:8080/api/productos',
      { data: producto });
    return respuesta
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al eliminar producto')
  }
}

export const addToCart = async (productoId: number, userId: number) => {
  console.log('producto | user ID');
  console.log(productoId + '|' + userId);
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/productos/carrito', {
      productoId, userId
    })
  } catch (error) {
    console.log(error)
  }
}


export const getForCart = async () => {
  const jwt = require('jsonwebtoken');
  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const rtaUserId: number = decodedToken.usuario.userId;
    console.log('user id de producto service get for cart:', rtaUserId);

    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos/carrito', {
      params: { userId: rtaUserId }
    });
    console.log('respuesta service front', respuesta);
    return respuesta;
  } catch (error) {
    console.log('error en producto.service', error);
    throw new Error('Error al traer todos los productos del carrito');
  }
};
