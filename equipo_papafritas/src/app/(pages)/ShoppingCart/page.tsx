"use client"

import { useEffect, useState } from 'react';
import './shopingCart.css';
import CardProductoCarrito from "@/app/componentes/cards/cardProdductoCarrito/CardProductoCarrito";
import { iProducto } from '@/app/model/CardProducto';
import { delToCart, getForCart } from '@/app/services/producto.service';
import { useRouter } from 'next/navigation'
import { withRolesPages } from '@/app/componentes/HOC/hoc.viewPermission';


const Home = () => {
  const [products, setProducts] = useState<iProducto[]>([]);
  const [total, setTotal] = useState<number>(0);
  const router = useRouter();

  const continuarComprando = () => {
    router.push('/product')
  }


  const fetchProductos = async () => {
    try {
      const response = await getForCart();
      if (response) {
        const rtaData = response.data;
        const filtrados = rtaData.filter(prod => prod.stock !== 0);
        setProducts(filtrados);
        const totalCalculado = calcularTotal(filtrados);
        setTotal(totalCalculado);
      }
    } catch (error) {
      console.error('Error fetching cart products:', error);
    }
  };

  const handleDelete = async (productoId: number) => {
    const jwt = require('jsonwebtoken');
    try {
      const token = localStorage.getItem('token');
      const userId: number = jwt.decode(token).usuario.userId;
      if (userId) {
        await delToCart(productoId, userId);
        const newProducts = products.filter(product => product.productoId !== productoId);
        setProducts(newProducts);
        const totalCalculado = calcularTotal(newProducts);
        setTotal(totalCalculado);
      }
    } catch (error) {
      console.error('Error deleting product from cart:', error);
    }
  };

  const calcularTotal = (data: iProducto[]) => {
    return data.reduce((acc, prod) => {
      if (prod.precioOferta > 0) {
        return acc + prod.precioOferta;
      } else {
        return acc + prod.precio;
      }
    }, 0);
  };



  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className='ContenedorCarrito'>
      <div className='ContenedorProductos'>
        {products.map((producto, index) => (
          <CardProductoCarrito key={index} producto={producto} onDelete={handleDelete} />
        ))}
      </div>
      <div className='ContenedorSubTotal'>
        <div className='subtotal'>
          <span>Subtotal</span>
          <span id="subtotal">${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
        </div>
        <div className='total'>
          <span>Total</span>
          <span id="total">${total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</span>
        </div>
        <button className="finalizar">FINALIZAR COMPRA</button>
        <button className="continuar" onClick={continuarComprando}>CONTINUAR COMPRANDO</button>
      </div>
    </div>
  );
}

export default withRolesPages(Home, [0, 1], '/login');

