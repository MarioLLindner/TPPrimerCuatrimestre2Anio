"use client"
import { SubmitHandler, useForm } from 'react-hook-form';
import './Login.css'
import { userLogin } from '@/app/model/UsuarioLogin';

export default function Home() {

  const { register, handleSubmit, formState: { errors } } = useForm<userLogin>();
  const onSubmit: SubmitHandler<userLogin> = async (datos) => {
    const resp = await login(datos);
    alert(resp.accessToken);
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className='form-label'>Email</label>
          <input className='form-control' {...register("email", { required: true })} />
        </div>
        <div>
          <label className='form-label'>Password</label>
          <input className='form-control' {...register("password", { required: true })} />
        </div>
        <input type="submit" className='btn' />
      </form>
    </>
  );
} 