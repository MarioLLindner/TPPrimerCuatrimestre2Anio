import React, { useState } from 'react';
import './modalRegistro.css';
import ojo from "../../../../Public/ojo/ojo.png"

const RegisterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [province, setProvince] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [direccion, setDireccion] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = () => {
        // Aquí puedes implementar la lógica para registrar al usuario
        console.log('Datos de registro:', { email, password, confirmPassword, phone, province, city, postalCode, direccion });
        onClose();
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="modal-background">
            <div className="register-modal">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>Registrarse</h2>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <div>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <button type="button" onClick={toggleShowPassword}>
                            <img className="ojoContraseña" src={ojo.src} alt="Show Password" />
                        </button>
                    </div>
                    {/*  <div>
            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Repetir Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="button" onClick={toggleShowConfirmPassword}>
            <img className="ojoContraseña" src={ojo.src} alt="Show Password" />
            </button>
            </div>
            <input type="text" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <select value={province} onChange={(e) => setProvince(e.target.value)} required>
              <option value="">Seleccionar Provincia</option> */}
                    {/* Opciones de provincia */}
                    {/*  </select>
            <select value={city} onChange={(e) => setCity(e.target.value)} required>
              <option value="">Seleccionar Localidad</option> */}
                    {/* Opciones de localidad */}
                    {/*   </select>
            <input type="text" placeholder="Código Postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
            <input type="text" placeholder="Direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} required />
            <button type="submit">Registrarse</button> */}
                </form>
            </div>
        </div>
    );
};

export default RegisterModal
