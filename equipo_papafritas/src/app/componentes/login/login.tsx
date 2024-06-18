import './login.css'
import { login } from "@/app/services/user.service";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import RegisterModal from "../modalRegistro/modalRegistro";
import { useRouter } from "next/navigation";


export const Login = () => {
  
  const router = useRouter();
  interface UsuarioLogin {
    username: string,
    password: string,
  }

  const { register, handleSubmit, formState: { errors } } = useForm<UsuarioLogin>();

  const onSubmit: SubmitHandler<UsuarioLogin> = async (datos) => {
    console.log('datos desde login tsx front',datos)
    try {
      const resp = await login(datos);
      /* cuando el usuario no existe da error*/
      
      const jwt = require('jsonwebtoken');
      console.log('console log jwt.decode',jwt.decode(resp.accessToken).usuario);
      /* alert(`alerta resp token ${jwt.decode(resp.accessToken).usuario.admin}`);
      alert(resp); */
      
      if (jwt.decode(resp.accessToken).usuario.admin === 1){
        router.push('/admin');
      }else{
        router.push("/home");
      }

    } catch (error) {
      /* agregar ventana emergente de error en el login*/
      alert('usuario o contraseña invalidos')      
    }

  }


  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };

  const handleCloseModal = () => {
    setRegisterModalOpen(false);
  };

  return (
    <>
      <div className="login-container">
        <h2>Iniciar Sesión</h2>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <input className='form-control' {...register("username", { required: true })} placeholder="Email" />
          </div>
          <div>
            <input type="password" className='form-control' {...register("password", { required: true })} placeholder="Contraseña" />
          </div>
          <button type="submit">Confirmar</button>
          <button onClick={handleRegisterClick}>Registrarse</button>
        </form>
        {isRegisterModalOpen && <RegisterModal onClose={handleCloseModal} />}
      </div>
    </>
  )
}
