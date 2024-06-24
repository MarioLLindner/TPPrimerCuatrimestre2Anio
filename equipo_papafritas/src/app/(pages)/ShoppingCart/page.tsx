"use client"

import { useEffect, useState } from 'react';
import './shopingCart.css';
import CardProductoCarrito from "@/app/componentes/cards/cardProdductoCarrito/CardProductoCarrito";
import { iProducto } from '@/app/model/CardProducto';
import { get5ProductosRandom,getForCart } from '@/app/services/producto.service';

export default function Home() {


  const [products, setProducts] = useState<iProducto[]>([]);
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await getForCart()
        if (response) {
          const rtaData = response.data;
          setProducts(rtaData);
          const totalCalculado = calcularTotal(rtaData);
          setTotal(totalCalculado);
        }
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    };
    fetchProductos();
  }, []);

  const calcularTotal = (data: iProducto[]) => {
    return data.reduce((acc, item) => acc + item.precio, 0);
  };

  return (
    <>
      cardProdductoCarrito
      <div className='ContenedorCarrito'>
        <div className='ContenedorProductos'>
        {products.map((producto, index) => (
              <CardProductoCarrito key={index} producto={producto} />
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
          <button className="continuar">CONTINUAR COMPRANDO</button>

  
        </div>
      </div>




    </>
  );
} 