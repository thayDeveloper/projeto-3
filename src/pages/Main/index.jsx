import './styles.css';
import Icon from '../../assets/Group5.png'
import Perfil from '../../assets/imgPerfil.png'


import Sair from '../../assets/exit.png'
import { clearAll, getItem } from '../../utils/storage'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tabela from '../../components/Tabelas/index'
import Resumo from '../../components/Resumo/index'
import Modal from '../../components/Modal/index'


import api from '../../services/api';



export default function Main() {

  const navegate = useNavigate();
  const token = getItem('token');
  const nome = getItem('nome');

  const [open, setOpen] = useState(false)


  const [transacao, setTransacao] = useState([])

  function handleExit() {
    clearAll();
    navegate('/login')
  }

  async function handleTransacoes() {

    try {

      if (!token) {
        return
      }

      const resposta = await api.get('/transacao', { headers: { authorization: 'Bearer ' + token } })

      setTransacao(resposta.data)

    } catch (error) {

    }
  }

  useEffect(() => {
    handleTransacoes()
  }, [])

  function handleOpenModal() {
    setOpen(true)

  }

  function handleClose() {
    setOpen(false)
  }

  return (


    <div className='container-main'>

      <div className='container-header'>

        <div className='container-logo'>
          <img src={Icon} alt="icone" />

          <h1>Dindin</h1>
        </div>
        <div className='container-perfil'>
          <img
            src={Perfil}
            alt="perfil"
          />
          <h1>{nome}</h1>

          <img
            src={Sair}
            alt="Sair"
            className='sair'
            onClick={handleExit}
          />

        </div>

      </div>

      <div className='container-interno'>

        <div className='container-table'>

          <table>
            <button className='btn-filtrar'

            >Filtrar</button>

            <div
              className='heder-tabela'
            >
              <div className='data-tabela'>
                <tr>
                  <th
                  >Data</th>

                </tr>
              </div>

              <div >
                <tr>
                  <th>Dia Semana</th>
                </tr>
              </div>

              <div >
                <tr>
                  <th>Descrição</th>
                </tr>
              </div>

              <div >
                <tr>
                  <th>Categoria</th>
                </tr>
              </div>

              <div>
                <tr>
                  <th>Valor</th>
                </tr>
              </div>
            </div>

            {transacao.map((item) => (
              <Tabela
                chave={item.id}
                descricao={item.descricao}
                categoria={item.categoria}
                data={item.data}
                tipo={item.tipo}
                valor={item.valor}

              />
            ))}


          </table>

        </div>

        <Resumo
          handleOpenModal={handleOpenModal}
        />
        <Modal
          open={open}
          handleClose={handleClose}
        />
      </div>

    </div>


  )
}



