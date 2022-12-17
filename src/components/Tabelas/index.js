import './styles.css'
import api from '../../services/api'
import { useEffect, useState } from 'react'
import { setItem, getItem } from '../../utils/storage'


export default function Tabela({ descricao, chave, categoria, data, valor, tipo }) {

  async function handleTransacoes() {
    try {

    } catch (error) {

    }
  }

  return (

    <div
      className='tabela'
      key={chave}
    >
      <tr className='tr-tabela'>
        <th>{data}</th>
        <th>{descricao}</th>
        <th>{categoria}</th>
        <th>{valor}</th>
        <th>{tipo}</th>

      </tr>
    </div>


  )

}
