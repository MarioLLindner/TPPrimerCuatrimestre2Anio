export interface userLog {
    username: string,
    password: string,
}


export interface userRegister {
    email: string;
    nombre:string;
    apellido:string;
    password: string;
    confirmPassword : string;
    telefono: string;
    provincia: string;
    ciudad: string;
    codigoPostal: string;
    direccion: string; 
}

export interface iUsuario {
    userId:number;
    email: string;
    nombre:string;
    apellido:string;
    password: string;
    telefono: string;
    provincia: string;
    ciudad: string;
    codigoPostal: string;
    direccion: string; 
}