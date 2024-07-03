'use client'
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userList.css';
import { iUsuario } from '@/app/model/UsuarioLogin';
import { deleteUser, getAllUsers } from '@/app/services/user.service';
import ModalEditUser from '../../modalRegistro/modalRegistroEditor'
import { userEdit } from '@/app/model/UsuarioLogin'

export const UserList = () => {
  const [usuario, setUsuarios] = useState<iUsuario[]>([])
  const [showUsersAux, setShowUsersAux] = useState<iUsuario[]>([])
  const [showUsers, setShowUsers] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<userEdit | null>(null);



  const fetchUsers = async () => {
    try {
      const rtaUsers = await getAllUsers();
      const listUsers: iUsuario[] = rtaUsers.data.map((user: any) => {
        return {
          userId: user.userId,
          nombre: user.nombre,
          email: user.email,
          apellido: user.apellido,
          password: user.password,
          telefono: user.telefono,
          provincia: user.provincia,
          ciudad: user.ciudad,
          codigoPostal: user.codigoPostal,
          direccion: user.direccion,
        }
      });
      setUsuarios(listUsers);
      setShowUsersAux(listUsers)
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handleButtonClick = async () => {
    setShowUsers(!showUsers);
    await fetchUsers();
  };


  const handleDelete = async (userId: number) => {
    const userToDelete = usuario.find(u => u.userId === userId);
    console.log(userToDelete)
    try {
      if (userToDelete) {
        await deleteUser(userToDelete)
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (userId: number) => {
    const userToEdit = usuario.find(u => u.userId === userId);
    if (userToEdit) {
      const userToEditWithDefaults: userEdit = {
        ...userToEdit,
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      };
      setEditingUser(userToEditWithDefaults);
    }
    await fetchUsers();
  };

  const handleCloseModal = async () => {
    setEditingUser(null);
    await fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        <Button className='BotonMostrarInfo' variant="outline-primary" onClick={handleButtonClick}>{showUsers ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}</Button>
        {showUsers && (
          <div className="list-container">
            <div className="list-header">
              <span>ID</span>
              <span>First Name</span>
              <span>Last Name</span>
              <span>Email</span>
              <span>Phone</span>
              <span>Province</span>
              <span>City</span>
              <span>Postal Code</span>
              <span>Address</span>
              <span>Actions</span>
            </div>
            {usuario.map((usuario, index) => (
              <div key={index} className="list-item">
                <span>{usuario.userId} </span>
                <span>{usuario.nombre} </span>
                <span>{usuario.apellido}</span>
                <span>{usuario.email}</span>
                <span>{usuario.telefono}</span>
                <span>{usuario.provincia}</span>
                <span>{usuario.ciudad}</span>
                <span>{usuario.codigoPostal}</span>
                <span>{usuario.direccion}</span>
                <span className="actions">
                  <Button variant="outline-success" onClick={() => handleEdit(usuario.userId)}>Edit</Button>
                  <Button variant="outline-danger" onClick={() => handleDelete(usuario.userId)}>Delete</Button>
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      {editingUser && (
        <ModalEditUser usuarioedit={editingUser} onClose={handleCloseModal} />
      )}
    </>
  );
};