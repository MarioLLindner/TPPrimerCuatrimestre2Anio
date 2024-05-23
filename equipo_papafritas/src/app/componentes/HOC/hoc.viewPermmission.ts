import { useRouter } from "next/navigation";

export function withRoles(Componente: any, rolesRequeridos: number[], back: string) {
  return function withRouteRolesReaper(props: any) {
    const router = useRouter();
    const RequiredPermissons = hasRequiredPermissons(rolesRequeridos);
    if (RequiredPermissons) {
      return
      <Componente { ...props } />
    } else {
      router.push(back);
      return null;
    }
  }
}

function hasRequiredPermissons(roles: number[]): boolean {
  const jwt = require('jsonwebtoken');
  const token = localStorage.getItem('token')
  const respuesta= jwt.decode(token).usuario.admin;
  
  const rolUsuario: number = respuesta;
  return roles.some((r) => {
    r==rolUsuario
  })
}



