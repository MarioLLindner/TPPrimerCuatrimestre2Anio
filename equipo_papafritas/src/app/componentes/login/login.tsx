import { login } from "@/app/services/user.service";
import { useForm } from "react-hook-form";
import './login.css'
import { useState } from "react";
import RegisterModal from "../modalRegistro/modalRegistro";

export const Login = () => {

    const [usuario, setUsuario] = useState({
        email:'',
        password: '',
    }); 

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        console.log(name);
        console.log(value);
        setUsuario(prevState => ({
          ...prevState,
          [name]: value
        }));
      };

      const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(usuario);
        // Login del Peliucas.JS
        login(usuario);
      };


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
                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="email"  value={usuario.email} onChange={handleChange} placeholder="Email" />
                    {/* <span className="error-message">Email es requerido</span> */}
                    <input type="password"  value={usuario.password} onChange={handleChange} placeholder="Contraseña" />
                    {/* <span className="error-message">Contraseña es requerida</span> */}
                    <button type="submit">Confirmar</button>
                    <button onClick={handleRegisterClick}>Registrarse</button>
                </form>
                {isRegisterModalOpen && <RegisterModal onClose={handleCloseModal} />}
            </div>
        </>
    )
}