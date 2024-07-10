import { Axios, AxiosResponse } from 'axios';
import clienteAxios from 'axios';
import { iProducto } from '../model/CardProducto';


//get all productos 
export const getAllProductos = async () => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos')
    console.log('service back front:', respuesta)
    return respuesta;
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al traer todos los productos')
  }
}
export const getProducto = async (productoId: number) => {
  try {
    const respuesta: AxiosResponse<any> = await clienteAxios.get(`http://localhost:8080/api/productos/producto/${productoId}`);
    /* console.log('Respuesta de producto service:', respuesta.data); */
    if (respuesta) {
      return respuesta;
    } else {
      return null;
    }
  } catch (error) {
    console.log('error en producto.service', error);
    throw new Error(`Error al traer el producto id ${productoId}`);
  }
};

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
    alert('Error al crear producto');
    throw new Error('Error al crear producto');
  }
}

//editar productos
export const putProducto = async (producto: iProducto) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.put('http://localhost:8080/api/productos', producto);
    return respuesta
  } catch (error) {
    console.log('error en producto.service', error)
    alert('Error al editar producto');
    throw new Error('Error al editar producto');
  }
}


//eliminar producto
export const deleteProducto = async (producto: iProducto) => {
  /* console.log('producto id front:', producto); */
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.delete('http://localhost:8080/api/productos',
      { data: producto });
    return respuesta
  } catch (error) {
    console.log('error en producto.service', error);
    alert('Error al eliminar producto');
    throw new Error('Error al eliminar producto');
  }
}
//añadir producto a carrito de user
export const addToCart = async (productoId: number, userId: number) => {
  /* console.log('producto | user ID');
  console.log(productoId + '|' + userId); */
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/productos/carrito', {
      productoId, userId
    })
  } catch (error) {
    console.log(error)
  }
}

//eliminar producto a carrito de user
export const delToCart = async (productoId: number, userId: number) => {
  /* console.log('producto | user ID');
  console.log(productoId + '|' + userId); */
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.delete('http://localhost:8080/api/productos/carrito',
      {
        data: { productoId, userId }
      })
  } catch (error) {
    console.log(error)
  }
}

//trae los productos del carrito de un user
export const getForCart = async () => {
  const jwt = require('jsonwebtoken');
  try {
    const token = localStorage.getItem('token');
    const decodedToken = jwt.decode(token);
    const rtaUserId: number = decodedToken.usuario.userId;
    /* console.log('user id de producto service get for cart:', rtaUserId); */

    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos/carrito', {
      params: { userId: rtaUserId }
    });
    /* console.log('respuesta service front', respuesta); */
    return respuesta;
  } catch (error) {
    console.log('error en producto.service', error);
    throw new Error('Error al traer todos los productos del carrito');
  }
};

//Trae todas las categorias
export const getAllCategorias = async () => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos/categoria')
    console.log('service back front:', respuesta)
    return respuesta;
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al traer todas las categorias')
  }
}

//Crear Categoria Nueva
export const postCategoria = async (categoria: any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/productos/categoria', categoria);
    return respuesta
  } catch (error) {
    console.log('error en producto.service', error)
    alert('Error al crear la categoria');
    throw new Error('Error al crear la categoria');
  }
}

//Traer todas las Sub-Categorias
export const getSubCategoriasByCategoriaId = async (idCategoria: number) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.get('http://localhost:8080/api/productos/subcategoria', 
      {params : {idCategoria}})
    return respuesta;
  } catch (error) {
    console.log('error en producto.service', error)
    throw new Error('Error al traer todas las sub-categorias')
  }
}

//Crear nueva Sub-Categoria
export const postSubCategoria = async (subCategoria: any) => {
  try {
    const respuesta: AxiosResponse<any, any> = await clienteAxios.post('http://localhost:8080/api/productos/subcategoria', subCategoria);
    return respuesta
  } catch (error) {
    console.log('error en producto.service post categoria', error)
    alert('Error al crear la sub-categoria');
    throw new Error('Error al crear la sub-categoria');
  }
}