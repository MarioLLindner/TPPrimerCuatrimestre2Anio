import { useRouter } from "next/navigation";
import React, { ComponentType } from "react";


type ComponenteType = ComponentType<any>;

function hasRequiredPermissons(roles: number[]): boolean {
  try {
    const jwt = require('jsonwebtoken');
    const token = localStorage.getItem('token')
    const respuesta: number | null = jwt.decode(token).usuario.admin;
    /*  alert(`rol usuario ${rolUsuario}`)
        alert(`roles ${roles}`)
        alert(`respuesta some ${
          roles.includes(rolUsuario)
        }`) */
        if (respuesta !== null) {
          return roles.some(rol => rol === respuesta);
    } else {
      return false
    }
  } catch (error) {
    /* console.log('error hoc',error) */
    return false
  }
}


export function withRolesPages(Componente: any, rolesRequeridos: number[], back: string) {
  return function withRouteRolesReaper(props: any) {
    const router = useRouter();
    const RequiredPermissons = hasRequiredPermissons(rolesRequeridos);
    if (RequiredPermissons) {
      return (<Componente {...props} />)
    } else {
      router.push(back);
      return null;
    }
  }
}
export function withRolesComponets(Componente: ComponentType<any>, rolesRequeridos: number[]) {
  return function withRouteRolesReaper(props: any) {
    const RequiredPermissons = hasRequiredPermissons(rolesRequeridos);
    if (RequiredPermissons) {
      return <Componente {...props} />;
    } else {
      return null;
    }
  }
}





