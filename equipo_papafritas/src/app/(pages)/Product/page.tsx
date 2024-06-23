"use client"
import ProductCard from '@/app/componentes/cards/cardProducto/CardProducto';
import { iProducto } from '@/app/model/CardProducto';
import { getAllProductos } from '@/app/services/producto.service';
import React, { useEffect, useState } from 'react';
import './product.css'
import PriceFilter from '@/app/componentes/filtros/PriceFilter';


export default function Home() {

  const [product, setProduct] = useState<iProducto[]>([]);
  const [productAux, setProductAux] = useState<iProducto[]>([]);

  const productos = async () => {
    try {
      const rtaProductos = await getAllProductos();
      const listProductos: iProducto[] = rtaProductos.data.map((prod: any) => {
        return {
          productoId: prod.productoId,
          nombre: prod.nombre,
          descripcion: prod.descripcion,
          imagenLink: prod.imagenLink,
          detalles: prod.detalles,
          precio: prod.precio,
          precioOferta: prod.precioOferta,
        };
      });
      setProduct(listProductos)
      setProductAux(listProductos)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleFilterChange = (filter) => {
    console.log('Selected filter:', filter);
  };

  useEffect(() => {
    productos();
  }, []);

  return (
    <>
      <div className='DivGeneralCategorias'>
        DIV GENERAL
        <div className='DivOrdenamiento'>
          <div className='DivSecciones'>
            <ol>
              <li>
                <a href="">
                  <span>Casa Lindner</span>
                </a>
              </li>
              <li>
                <span>{'>'}</span>
              </li>
              <li>
                <a href="">
                  <span>Categorias</span>
                </a>
              </li>
            </ol>
          </div>
          <div className='DivNombreSeccion'>
            <h1>
              Categorias
            </h1>
          </div>
          <div className='DivFiltrosGeneral' style={{ flex: '1 1 0%' }}>
            <div>
              <label>ORDENAR POR:</label>
              <select name="" id="">
                <option value="">Más Relevante</option>
                <option value="MenorPrecio">Menor Precio</option>
                <option value="MayorPrecio">Mayor Precio</option>
              </select>
            </div>
            <PriceFilter onFilterChange={handleFilterChange}/>
            {/* <div className='DivFiltroPorPrecio'>
              <h3>Precio</h3>
              <ul className='UlFiltroPorPrecio'>
                <li><a href="">Menos de .....</a></li>
                <li><a href="">..... a ......</a></li>
                <li><a href="">..... o más</a></li>
                <li>
                  <form className="FormFiltroPorPrecio" action="">
                    <input type="number" placeholder='min' />
                    <span>-</span>
                    <input type="number" placeholder='max' />
                    <button type='submit'>Buscar</button>
                  </form>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
        <div className='DivContCardsyPaginado'>
          <div className='DivContCards' style={{ flex: '3 1 0%' }}>
            {product.map((producto, index) => (
              <ProductCard key={index} producto={producto} />
            ))}
            Contenedor de las cards de los productos
          </div>
          <div>
            paginado
          </div>
        </div>
      </div>

    </>
  );
}

