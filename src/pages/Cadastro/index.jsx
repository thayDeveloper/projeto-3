import './styles.css'
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../assets/Group5.png'
import { useState, useEffect } from 'react';
import { getItem } from '../../utils/storage';
import api from '../../services/api';



export default function Cadastro() {


  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    senhaComfirmada: '',
  })

  const navegate = useNavigate()


  function handleChangeValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      if (!form.nome || !form.senha || !form.email || !form.senhaComfirmada) {

        return
      }
      if (form.senha !== form.senhaComfirmada) {
        return
      }

      await api.post('/usuario', {

        ...form
      })



      navegate('/login')

    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const token = getItem('token')

    if (token) {
      navegate('/login')
    }
  }, [])



  return (
    <div className='container-cadastro'>

      <div className='logo-container'>
        <img src={Icon} alt="" />

        <h1>Dindin</h1>
      </div>

      <div className='card-cadastro'>
        <h1>Cadastre-se</h1>

        <form onSubmit={handleSubmit}>

          <div >
            <p>Nome</p>
            <input

              type='text'
              name='nome'
              placeholder='Name'
              value={form.nome}
              onChange={handleChangeValue}
            />
          </div>

          <div>
            <p>E-mail</p>
            <input
              name='email'
              type='text'
              placeholder='Email'
              value={form.email}
              onChange={handleChangeValue}
            />
          </div>

          <div>

            <p>Senha</p>
            <input
              type='password'
              name='senha'
              placeholder='Senha'
              value={form.senha}
              onChange={handleChangeValue}
            />
          </div>
          <div>
            <p>Confirmação de senha</p>
            <input
              type='password'
              name='senhaComfirmada'
              placeholder='confirmar senha'
              value={form.senhaComfirmada}
              onChange={handleChangeValue}
            />
          </div>

          <button
            className='btn-cadastrar'>Cadastrar</button>
        </form>


        <Link to='/Login' className='link-login'>Já tem cadastro? Clique aqui!</Link>
      </div>
    </div>
  )



}
