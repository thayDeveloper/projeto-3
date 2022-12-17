import './styles.css'



export default function Resumo({ handleOpenModal }) {



  return (
    <>

      <div
        className='container-resumo'
      >


        <div className='resumo'>


          <div className='coluna-esquerda'>
            <h1>Resumo</h1>
            <div className='span-esquerda'>
              <span>Entradas</span>
              <span>Saidas</span>
            </div>


          </div>

          <div className='coluna-direita'>

            <span className='span-entrada'>R$200,00</span>
            <span className='span-saida' >R$70,50</span>

          </div>

          <div className='saldo'>
            <h1>Saldo</h1>
            <span>R$129,90</span>
          </div>
        </div>
        <button
          className='btn-registro'
          type='button'
          onClick={handleOpenModal}

        >Adicionar Registro</button>
      </div>

    </>
  )
}