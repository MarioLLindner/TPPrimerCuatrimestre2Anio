"use client"
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './cargaProducto.css'


export const PermisosAdmin = () => {

    return (
        <>
            <div className='crudGeneral'>
                <div className="crud">
                    <h2>Productos</h2>
                    <Button variant="outline-primary">Cargar Producto</Button>{' '}
                    <Button variant="outline-success">Actualizar Producto</Button>{' '}
                    <Button variant="outline-danger">Eliminar Producto</Button>{' '}
                </div>
                <div className="crud">
                    <h2>Usuario</h2>
                    <Button variant="outline-primary">Cargar Usuario</Button>{' '}
                    <Button variant="outline-success">Actualizar Usuario</Button>{' '}
                    <Button variant="outline-danger">Eliminar Usuario</Button>{' '}
                </div>
            </div>

        </>

    )
}