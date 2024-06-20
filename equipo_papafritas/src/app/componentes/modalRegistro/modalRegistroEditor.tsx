import React, { useEffect, useState } from 'react';
import './modalRegistro.css';
import ojo from "../../../../Public/ojo/ojo.png"
import { putUser } from '@/app/services/user.service';
import { userEdit } from '@/app/model/UsuarioLogin';

interface UsuarioModalEditorProps {
    onClose: () => void;
    usuarioedit: userEdit;
}

const ModalEditUser: React.FC<UsuarioModalEditorProps> = ({ onClose, usuarioedit }) => {
    const [email, setEmail] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [telefono, setPhone] = useState('');
    const [provincia, setProvince] = useState('');
    const [ciudad, setCity] = useState('');
    const [codigoPostal, setPostalCode] = useState('');
    const [direccion, setDireccion] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    useEffect(() => {
        if (usuarioedit) {
            setEmail(usuarioedit.email);
            setNombre(usuarioedit.nombre);
            setApellido(usuarioedit.apellido);
            setOldPassword(usuarioedit.oldPassword);
            setNewPassword(usuarioedit.newPassword)
            setConfirmNewPassword(usuarioedit.confirmNewPassword);
            setPhone(usuarioedit.telefono);
            setProvince(usuarioedit.provincia);
            setCity(usuarioedit.ciudad);
            setPostalCode(usuarioedit.codigoPostal);
            setDireccion(usuarioedit.direccion);
            setShowPassword(false);
            setShowConfirmPassword(false);
        }
    }, [usuarioedit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userData: userEdit = {
            userId:usuarioedit.userId,
            email,
            oldPassword,
            nombre,
            apellido,
            newPassword,
            confirmNewPassword,
            telefono,
            provincia,
            ciudad,
            codigoPostal,
            direccion,
            password:usuarioedit.password
        };
        console.log('USER DATA', userData);

        try {
            await putUser(userData);
            onClose();
        } catch (error) {
            console.error('Error edit user:', error);
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
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                    <div className='inputPassword'>
                        <input type={showPassword ? 'text' : 'password'} placeholder="Contraseña Vieja" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />
                        <button type="button" onClick={toggleShowPassword}>
                            <img className="ojoContraseña" src={ojo.src} alt="Show Password" />
                        </button>
                    </div>
                    <div className='inputPassword'>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Nueva Contraseña" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                        <button type="button" onClick={toggleShowConfirmPassword}>
                            <img className="ojoContraseña" src={ojo.src} alt="Show Password" />
                        </button>
                    </div>
                    <div className='inputPassword'>
                        <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Repetir Contraseña" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                        <button type="button" onClick={toggleShowConfirmPassword}>
                            <img className="ojoContraseña" src={ojo.src} alt="Show Password" />
                        </button>
                    </div>
                    <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setPhone(e.target.value)} /* required */ />
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
                    <button type="submit" onClick={onClose}>Editar Usuario</button>
                </form>
            </div>
        </div>
    );
};

export default ModalEditUser