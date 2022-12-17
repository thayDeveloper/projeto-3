import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../../assets/Group5.png'
import { useState } from 'react';
import api from '../../services/api';
import { setItem, getItem, clearAll } from '../../utils/storage'
import { useEffect } from 'react';


export default function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const navegate = useNavigate()

  useEffect(() => {
    const token = getItem('token')

    if (token) {
      navegate('/main')
    }
  }, [])


  async function handleSubmit(e) {

    e.preventDefault()

    try {

      if (!email || !senha) {
        alert('Preencha todos os campos!')
      }

      const resposta = await api.post('/login', { email, senha })



      const { token, usuario } = resposta.data




      setItem('token', token)
      setItem('nome', usuario.nome)

      navegate('/main')

    } catch (error) {

    }
  }



  return (
    <div className='container-login'>

      <div className='logo-container'>
        <img src={Icon} alt="" />
        <h1>Dindin</h1>
      </div>

      <div className='container-cadastre'>

        <h1>Controle suas <span className='roxo'>finanças</span>,
          sem planilha chata.</h1>

        <p>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</p>


        <Link to='/'>
          <button className='btn-cadastro'
          >
            cadastre-se
          </button>
        </Link>


      </div>

      <div className='card-login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <p>E-mail</p>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>

          <div>
            <p>Senha</p>
            <input
              type='password'
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            className='btn-entrar'
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  )
}