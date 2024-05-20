import React, { useState } from 'react';
import './modalRegistro.css';
import ojo from "../../../../Public/ojo/ojo.png"
import { postUserRegister } from '@/app/services/user.service';
import { userRegister } from '@/app/model/UsuarioLogin';

const RegisterModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telefono, setPhone] = useState(0);
  const [provincia, setProvince] = useState('');
  const [ciudad, setCity] = useState('');
  const [codigoPostal, setPostalCode] = useState('');
  const [direccion, setDireccion] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData: userRegister = {
      nombre,
      apellido,
      email,
      password,
      confirmPassword,
      telefono,
      provincia,
      ciudad,
      codigoPostal,
      direccion,
    };
    console.log('USER DATA', userData);

    try {
      await postUserRegister(userData); 
      onClose(); 
    } catch (error) {
      console.error('Error registering user:', error);
    }
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
          <div>
            <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Repetir Contraseña" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <button type="button" onClick={toggleShowConfirmPassword}>
              <img className="ojoContraseña" src={ojo.src} alt="Show Password" />
            </button>
          </div>
          <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setPhone(Number(e.target.value))} /* required */ />
          <select value={provincia} onChange={(e) => setProvince(e.target.value)} /* required */>
            <option value="">Seleccionar Provincia</option>
            <option value="Buenos Aires">Buenos Aires</option>
          </select>
          <select value={ciudad} onChange={(e) => setCity(e.target.value)} /* required */>
            <option value="">Seleccionar Localidad</option>
            <option value="Olavarria">Olavarria </option>
          </select>
          <input type="text" placeholder="Código Postal" value={codigoPostal} onChange={(e) => setPostalCode(e.target.value)} /* required */ />
          <input type="text" placeholder="Direccion" value={direccion} onChange={(e) => setDireccion(e.target.value)} /* required */ />
          <button type="submit">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal
