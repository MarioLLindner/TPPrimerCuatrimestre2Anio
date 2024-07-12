export interface iReporte {
  idReporte:number;
  idUsuario:number;
  fechaReporte:Date;
  montoGastado:number;
}

export interface iReporteCompras{
    idCompra:number;
    idReporte:number;
    idProducto:number;
    cantidad:number;
    precioUnitario:number;
  }
