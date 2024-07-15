"use client"
import { PermisosAdmin } from "@/app/componentes/CargaProducto/cargaProducto";
/* import "./reportes.css" */
import { withRolesPages } from "@/app/componentes/HOC/hoc.viewPermission";
import { ReportList } from "@/app/componentes/Lists/reportes/reporteList";


const Home = () => {
    return (
        <>
           <ReportList/>
        </>
    );
}

export default withRolesPages(Home,[1],'/home');