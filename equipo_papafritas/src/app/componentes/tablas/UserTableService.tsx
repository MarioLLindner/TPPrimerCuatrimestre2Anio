import { getAllUsers } from '@/app/services/user.service';
import { iUsuario } from '@/app/model/UsuarioLogin';
import { UserTableClient } from './UserTable';

export const UserTable = async () => {
  const response = await getAllUsers();
  const data: iUsuario[] = response.data;
  
  return <UserTableClient data={data} />;
};
