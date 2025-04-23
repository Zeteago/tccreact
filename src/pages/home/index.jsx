import React, { useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Food from '../../assets/icones/food.png'
import Commerce from '../../assets/icones/commerce.png'
import './style.css'
import Button from '@mui/material/Button';

import AbaEsquerda from '../../components/abaEsquerda'
import AbaDireita from '../../components/abaDireita'
import ConteudoPrincipal from '../../components/conteudoPrincipal'

function Home() {

  const [pesquisa, setPesquisa] = useState(false)

  //VAMBORA BOTAO

  const [botao, setAciona] = useState(true)
  
  /*PARA BUSCAAAAAAA*/

  function btMuda() {
    setPesquisa(false)
    setAciona(!botao)
  }

  const inputBusca = useRef(null)

  function ativaBusca() {
    setPesquisa(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setPesquisa(true)
    }
  }

  return (
    <>
    <div className='Tudo'>
      <div className='menu-esquerdo'>
        <AbaEsquerda />
      </div>
      <div className='conteudo'>
        <div className='hotbar'>
            {
              botao == true ? (
                <div className='botoes'>
                  <Button className='button' variant="contained" onClick={btMuda}>
                    <img className='foodImg' src={Food} draggable='false'/>
                    Food
                  </Button>
                  <Button className='button' variant="contained" onClick={btMuda} disabled>
                  <img className='foodImg' src={Commerce} draggable='false'/>
                    Commerce
                  </Button>
                </div>
              ) : (
                <div className='botoes'>
                  <Button className='button' variant="contained" onClick={btMuda} disabled>
                    <img className='foodImg' src={Food} draggable='false'/>
                    Food
                  </Button>
                  <Button className='button' variant="contained" onClick={btMuda}>
                  <img className='foodImg' src={Commerce} draggable='false'/>
                    Commerce
                  </Button>
                </div>
              )
            }
          <div className='input-container' >
            <div className='button-input'>
              <button className='menu'>
                <MenuIcon className="menu-icon" />
              </button>
              <input 
                placeholder="Buscar" 
                name='caixaPesquisa' 
                type='text' 
                ref={inputBusca}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button className='search' onClick={ativaBusca}>
              <SearchIcon className="search-icon" />
            </button>
          </div>
        </div>
        {
          pesquisa == false ? (
            <ConteudoPrincipal />
          ) : (
            <div>Nada aqui</div>
          )
        }
      </div>
      <div className='menu-direito'>
        <AbaDireita />
      </div>
    </div>
    </>      
  )
}
  
  export default Home