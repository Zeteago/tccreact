import React, { useRef, useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import Food from '../../assets/icones/food.png'
import Commerce from '../../assets/icones/commerce.png'
import './style.css'
import Button from '@mui/material/Button';

import AbaEsquerda from '../../components/abas/abaEsquerda'
import AbaDireita from '../../components/abas/abaDireita'
import ConteudoPrincipal from '../../components/conteudoPrincipal'

import { useLocation } from 'react-router-dom';

function Home() {
  
  const location = useLocation(); // Hook para acessar o objeto de localização
  const message = location.state?.message;

  const [pesquisa, setPesquisa] = useState(false)

  //VAMBORA BOTAO

  const [botao, setAciona] = useState('food')

  /*PARA BUSCAAAAAAA*/

  function btMuda(event) {
    const button = event.target
    const name = button.dataset.name;

    setPesquisa(false)
    if (botao === 'food' || name === 'food') {
      setAciona('commerce')
    } else if (botao === 'commerce' || name === 'commerce') {
      setAciona('food')
    } else {
      setAciona('ambos')
    }
  }

  const inputBusca = useRef(null)

  function ativaBusca() {
    setPesquisa(true)
    setAciona('ambos')
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setPesquisa(true)
      setAciona('ambos')
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
              botao === 'food' ? (
                <div className='botoes'>
                  <Button data-name='food' className='button' variant="contained" onClick={btMuda}>
                    <img className='foodImg' src={Food} draggable='false' />
                    Food
                  </Button>
                  <Button data-name='commerce' className='button' variant="contained" onClick={btMuda} disabled>
                    <img className='foodImg' src={Commerce} draggable='false' />
                    Commerce
                  </Button>
                </div>
              ) : botao === 'commerce' ? (
                <div className='botoes'>
                  <Button data-name='food' className='button' variant="contained" onClick={btMuda} disabled>
                    <img className='foodImg' src={Food} draggable='false' />
                    Food
                  </Button>
                  <Button data-name='commerce' className='button' variant="contained" onClick={btMuda}>
                    <img className='foodImg' src={Commerce} draggable='false' />
                    Commerce
                  </Button>
                </div>
              ) : (
                <div className='botoes'>
                  <Button data-name='food' className='button' variant="contained" onClick={btMuda}>
                    <img className='foodImg' src={Food} draggable='false' />
                    Food
                  </Button>
                  <Button data-name='commerce' className='button' variant="contained" onClick={btMuda}>
                    <img className='foodImg' src={Commerce} draggable='false' />
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