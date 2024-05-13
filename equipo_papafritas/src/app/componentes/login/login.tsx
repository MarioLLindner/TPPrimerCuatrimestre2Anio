import { login } from "@/app/services/user.service";
import { SubmitHandler, useForm } from "react-hook-form";
import './login.css'
import { useState } from "react";
import RegisterModal from "../modalRegistro/modalRegistro";

export const Login = () => {

    interface UsuarioLogin {
        email: string,
        password: string,
    }

    const [usuario, setUsuario] = useState({
        email:'',
        password: '',
    });

    

    const { register, handleSubmit, formState: { errors } } = useForm<UsuarioLogin>();
    const onSubmit: SubmitHandler<UsuarioLogin> = async (datos) => {
        const resp = await login(datos);
        alert(resp.accessToken);
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
                    <input type="email" {...register('email', { required: true })} value={usuario.email} placeholder="Email" />
                    {errors.email && <span className="error-message">Email es requerido</span>}
                    <input type="password" {...register('password', { required: true })} value={usuario.password} placeholder="Contraseña" />
                    {errors.password && <span className="error-message">Contraseña es requerida</span>}
                    <button type="submit">Confirmar</button>
                    <button onClick={handleRegisterClick}>Registrarse</button>
                </form>
                {isRegisterModalOpen && <RegisterModal onClose={handleCloseModal} />}
            </div>
        </>
    )
}