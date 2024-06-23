'use client';
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  SortingState,
  flexRender,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel
} from '@tanstack/react-table'
import { iUsuario } from '@/app/model/UsuarioLogin';
import Button from 'react-bootstrap/Button';
import { deleteUser, getAllUsers } from '@/app/services/user.service';
import { useState } from 'react';
import { userEdit } from '@/app/model/UsuarioLogin';
import ModalEditUser from '../modalRegistro/modalRegistroEditor';
import '../Lists/Users/userList.css';
/* import './userList.css'; */



interface UserTableClientProps {
  data: iUsuario[];
}

export const UserTableClient = ({ data }: UserTableClientProps) => {
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

  const columns: ColumnDef<iUsuario>[] = [
    {
      header: 'ID',
      accessorKey: 'userId'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Nombre',
      accessorKey: 'nombre'
    },
    {
      header: 'Apellido',
      accessorKey: 'apellido'
    },
    {
      header: 'Teléfono',
      accessorKey: 'telefono'
    },
    {
      header: 'Provincia',
      accessorKey: 'provincia'
    },
    {
      header: 'Ciudad',
      accessorKey: 'ciudad'
    },
    {
      header: 'Código Postal',
      accessorKey: 'codigoPostal'
    },
    {
      header: 'Dirección',
      accessorKey: 'direccion'
    },
    {
      header: 'Acciones',
      cell: ({ row }) => (
        <>
          <Button variant="outline-success" onClick={() => handleEdit(row.original.userId)}>Edit</Button>
          <Button variant="outline-danger" onClick={() => handleDelete(row.original.userId)}>Delete</Button>
        </>
      )
    }
  ];

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

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  

  return (
    <>
        <div className="table-container">
        <Button variant="outline-primary" onClick={handleButtonClick}>
          {showUsers ? 'Ocultar Usuarios' : 'Mostrar Usuarios'}
        </Button>
        {showUsers && (
          <table>
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
        {editingUser && (
          <ModalEditUser usuarioedit={editingUser} onClose={handleCloseModal} />
        )}
    </>

  )
}