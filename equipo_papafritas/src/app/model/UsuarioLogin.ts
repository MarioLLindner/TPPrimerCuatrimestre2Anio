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
    telefono: number;
    provincia: string;
    ciudad: string;
    codigoPostal: string;
    direccion: string; 
}

export interface userID {
    id: any;
}