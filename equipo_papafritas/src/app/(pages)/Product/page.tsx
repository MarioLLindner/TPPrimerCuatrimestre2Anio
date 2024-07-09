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
  const [busqueda,setBusqueda] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(16);
  /* const [categoriaFiltro, setCategoriaFiltro] = useState<String>("Categorias") */

  const productos = async () => {
    try {
      const rtaProductos = await getAllProductos();
      const listProductos: iProducto[] = rtaProductos.data.map((prod: any) => {
        return {
          productoId: prod.productoId,
          nombre: prod.nombre,
          marca: prod.marca,
          descripcion: prod.descripcion,
          imagenLink: prod.imagenLink,
          detalles: prod.detalles,
          precio: prod.precio,
          precioOferta: prod.precioOferta,
          stock: prod.stock
        };
      }).filter((prod: iProducto) => prod.stock > 0);
      console.log(listProductos)
      setProduct(listProductos)
      setProductAux(listProductos)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleChange = e => {
    setBusqueda(e.target.value)
    filtrar(e.target.value)
  }

  const filtrar =  (terminoBusqueda:any) => {
    var resultadoBusqueda= productAux.filter((prod) => {
      if(prod.nombre.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
      || prod.marca.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
    ){
      return prod
    }
    });
    setProduct(resultadoBusqueda)
  }

/*   const TituloFiltro = (product:iProducto) => {
    var tituloproducto = product.categoria
    setCategoriaFiltro(tituloproducto)
  } */
 

  const handleFilterChange = (filter:any) => {
    console.log('Selected filter:', filter);
  };


  //Paginado
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(product.length / productsPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.slice(
    Math.max(0, currentPage - 3),
    Math.min(totalPages, currentPage + 2)
  );

  useEffect(() => {
    productos();
  }, []);

  return (
    <>
      <div className='DivGeneralCategorias'>
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
              {/* {categoriaFiltro} */}Categorias
            </h1>
          </div>
          <div className='containerInput'>
            <label className='pBuscador'>BUSCADOR: </label>
            <input 
            type="text" 
            className='form-control inputBuscar'
            value={busqueda}
            placeholder='Busqueda por Nombre o Marca'
            onChange={handleChange}
            />
          </div>
          <div className='DivFiltrosGeneral' style={{ flex: '1 1 0%' }}>
            <div className='DivFiltroOrden'>
              <label>ORDENAR POR:</label>
              <select className="SelectFiltroOrden" name="" id="">
                <option value="">Más Relevante</option>
                <option value="MenorPrecio">Menor Precio</option>
                <option value="MayorPrecio">Mayor Precio</option>
              </select>
            </div>
            <PriceFilter onFilterChange={handleFilterChange}/>
          </div>
        </div>
        <div className='DivContCardsyPaginado'>
          <div className='DivContCards' style={{ flex: '4 1 0%' }}>
            {currentProducts.map((producto, index) => (
              <ProductCard key={index} producto={producto} 
              urlProducto={`/product/${producto.productoId}`}/>
            ))}
          </div>
          <div className='pagination'>
          {currentPage > 1 && (
              <button
                onClick={() => paginate(currentPage - 1)}
              >
                Anterior
              </button>
            )}
            {renderPageNumbers.map(number => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() => paginate(currentPage + 1)}
              >
                Siguiente
              </button>
            )}
          </div>
        </div>
      </div>

    </>
  );
}

