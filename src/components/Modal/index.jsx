import './styles.css';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import { getItem } from '../../utils/storage';
import { useNavigate } from 'react-router-dom';


const token = getItem('token')



export default function Modal({ open, handleClose }) {

  const [form, setForm] = useState({
    valor: '',
    categoria_id: '',
    data: '',
    descricao: '',
    tipo: ''

  })
  const navegate = useNavigate()

  const [options, setOptions] = useState([{ id: '', descricao: '' }])


  function handleChangeValue(e) {

    setForm({ ...form, [e.target.name]: e.target.value });
  }


  async function handleCategoria() {

    try {
      if (!token) {
        return
      }
      const resposta = await api.get('/categoria', { headers: { authorization: 'Bearer ' + token } })
      setOptions(resposta.data)

    } catch (error) {

    }
  }

  async function handleSubmitEntrada(e) {
    e.preventDefault();
    try {

      if (!token) {
        return
      }

      await api.post('/transacao', form, { headers: { authorization: 'Bearer ' + token } })

      setForm(...form)

      navegate('/main')

    } catch (error) {


    }
  }

  useEffect(() => {

    handleCategoria()
  }, [])


  return (

    <>

      {open &&

        < div className='container-modal'>

          <div className='modal'>

            <div className='modal-body'>

              <div className='titulo-fechar'>
                <h1>Adicionar Registro</h1>
                <span
                  onClick={() => handleClose()}
                >X</span>
              </div>

              <button
                className='btn-entrada'
                onClick={() => setForm(...form, { tipo: 'Entrada' })}
              >Entrada
              </button>

              <button
                className='btn-saidas'
              >
                Saida
              </button>

              <form onSubmit={handleSubmitEntrada}>

                <div >
                  <p>Valor</p>
                  <input

                    type='number'
                    name='valor'
                    placeholder='Valor'
                    value={form.valor}
                    onChange={handleChangeValue}
                  />
                </div>

                <div>

                  <p>Categoria</p>

                  <select
                    name='categoria_id'
                    value={form.categoria_id}
                    onChange={handleChangeValue}
                  >
                    {options.map((item) => (
                      <option

                        key={item.id}
                        value={item.id}
                      >
                        {item.descricao}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <p>Data</p>
                  <input
                    type='text'
                    name='data'
                    placeholder='Data'
                    value={form.data}
                    onChange={handleChangeValue}
                  />
                </div>

                <div>
                  <p>Descrição</p>
                  <input
                    type='text'
                    name='descricao'
                    placeholder='descricao'
                    value={form.descricao}
                    onChange={handleChangeValue}
                  />
                </div>

                <button
                  className='btn-cadastrar'
                  type='submit'
                >Comfirmar</button>
              </form>

            </div>
          </div>
        </div>
      }
    </>
  )
}