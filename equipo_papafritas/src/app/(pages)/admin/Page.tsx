"use client"
import { PermisosAdmin } from "@/app/componentes/CargaProducto/cargaProducto";
import "./admin.css"
import { withRolesPages } from "@/app/componentes/HOC/hoc.viewPermission";


const Home = () => {
    return (
        <>
            <PermisosAdmin />
        </>
    );
}

export default withRolesPages(Home,[1],'/home');
