"use client"

import { useEffect, useState } from 'react';
import './shopingCart.css';
import CardProductoCarrito from "@/app/componentes/cards/cardProdductoCarrito/CardProductoCarrito";
import { iProducto } from '@/app/model/CardProducto';
import { deleteCart, delToCart, getForCart } from '@/app/services/producto.service';
import { useRouter } from 'next/navigation'
import { withRolesPages } from '@/app/componentes/HOC/hoc.viewPermission';
import { countReportes, postCompras, postReporte } from '@/app/services/reporte.service';
import { iReporte, iReporteCompras } from '@/app/model/reporte';
import WhatsAppButton from '@/app/componentes/whatsappButton/WhatsappButton';


const Home = () => {
  const [products, setProducts] = useState<iProducto[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [reporte, setReporte] = useState<iReporte>();
  const [cantReporte, setCantReporte] = useState<number>(0);
  const [compras, setCompras] = useState<iReporteCompras[]>([]);

  const router = useRouter();

  const phoneNumber = '2284664116';

  const continuarComprando = () => {
    router.push('/product')
  }

  const crearReporte = async () => {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem('token');
    const userId: number = jwt.decode(token).usuario.userId;
    const count = await countReportes()
    const countdata = (count?.data) + 1;
    const now = new Date()
    const subReporte: iReporte = {
      idReporte: countdata,
      idUsuario: userId,
      fechaReporte: now,
      montoGastado: total,
    }

    await postReporte(subReporte)
    console.log('REPORTEEEEEEE:', subReporte)
    crearReporteCompras(countdata)
  }

  const crearReporteCompras = (reporteId: number) => {
    const subReportesCompras: iReporteCompras[] = products.map(product => {
      return {
        idCompra: NaN,
        idReporte: reporteId,
        idProducto: product.productoId,
        cantidad: 1,
        precioUnitario: product.precioOferta > 0 ? product.precioOferta : product.precio
      };
    });
    postCompras(subReportesCompras);
    console.log('COMPRASSSS', subReportesCompras)
  };


  const vaciarCarrito = () => {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem('token');
    const userId: number = jwt.decode(token).usuario.userId;
    deleteCart(userId)
  }

  const finalizarCompra = async () => {
    try {
      crearReporte();
      vaciarCarrito();
      alert('GRACIAS POR SU COMPRA')
      router.push('/home');
    } catch (error) {
      console.error('Error en Finalizar Compra:', error);
    }
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
      console.error('Error eliminando producto del carrito:', error);
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
    <><div className='ContenedorCarrito'>
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
        {products.length > 0 && (
          <button className="finalizar" onClick={finalizarCompra}>FINALIZAR COMPRA</button>
        )}
        <button className="continuar" onClick={continuarComprando}>CONTINUAR COMPRANDO</button>
      </div>
    </div>
    <WhatsAppButton phoneNumber={phoneNumber} />
    </>
  );
}

export default withRolesPages(Home, [0, 1], '/login');
