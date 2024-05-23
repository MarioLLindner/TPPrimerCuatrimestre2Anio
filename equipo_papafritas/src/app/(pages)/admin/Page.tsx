"use client"
import { PermisosAdmin } from "@/app/componentes/CargaProducto/cargaProducto";
import "./admin.css"
import { withRoles } from "@/app/componentes/HOC/hoc.viewPermmission";


const Home = () => {
    return (
        <>
            <PermisosAdmin />
        </>
    );
}

export default withRoles(Home,[1],'/home');
