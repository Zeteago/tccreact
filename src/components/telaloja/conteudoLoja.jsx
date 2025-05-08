import './styleConteudoLoja.css';

import Fundo from '../../assets/app/fundo.jpg'

import React, { useRef, useState } from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ProdutoVer from '../popups/produtoVer';

const labels = {
  0.5: 'Péssimo',
  1: 'Péssimo+',
  1.5: 'Ruim',
  2: 'Ruim+',
  2.5: 'Razoável',
  3: 'Razoável+',
  3.5: 'Bom',
  4: 'Bom+',
  4.5: 'Excelente',
  5: 'Excelente+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function ConteudoLoja() {
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const [tipoUsuario, setTipoUsuario] = useState(false) //true = loja, false = cliente;

  const inputBusca = useRef(null)
  const [pesquisa, setPesquisa] = useState(false)

  function ativaBusca() {
    setPesquisa(true)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setPesquisa(true)
    }
  }

  //PREPARAAAAAAAAAAAA que aqui tao os produto
  
	let produtos = []

	for (var cont = 1; cont < 21; cont++) {
		produtos.push(`Produto ${cont}`)
	}

  //POPUP

  const [popupEstado, setPopupEstado] = useState(null);
  
  const abrirPopup = (event) => {
    setPopupEstado(event.currentTarget);
  };

  const fecharPopup = () => {
    setPopupEstado(null);
  };

  const open = Boolean(popupEstado);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div className="td-conteudo-loja">
      <div className='parte-superior-loja'>
        <div className='parte-esquerda-loja'>
          <p className='nome-loja'>Loja Tal</p>
          <p className='categoria-loja'>Marmitas e Sucos</p>
          <p className='seguidores'>Seguidores: 999</p>
        </div>
        <div className='parte-descricao-loja'>
          <p className='descricao-loja'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusantium sunt iste quibusdam provident hic consequatur, nam rerum enim perferendis quo vel, molestias vero voluptate eligendi possimus nemo tenetur nisi!
          </p>
        </div>
        <div className='parte-avaliacao-loja'>
          <div className='Estrelas'>
          <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }} className='Avaliacao-loja'>
            <Rating
              name="hover-feedback"
              value={value}
              precision={0.5}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
              <Box sx={{ ml: 2, margin: 0}}>{labels[hover !== -1 ? hover : value]}</Box>
            )}
          </Box>
          </div>
          <p className='quantidade-avaliacao'>99 avaliações</p>
        </div>
      </div>
      <div className='parte-meio-loja'>

        <div className='filtro-adicionar'>
          <button className='botao-filtro'>
            Filtrar
            <MenuIcon className="menu-icon" />
          </button>
          {tipoUsuario === true ? (
            <button 
              className='botao-adicionar'
              onClick={() => setTipoUsuario(false)}
            >
              Adicionar Produto
            </button>
          ) : (
            <button 
              className='botao-adicionar'
              onClick={() => setTipoUsuario(true)}
            >
              Adicionar Avaliação
            </button>
          )}
        </div>

        <div className='pesquisa-loja'>

          <div className='input-container' >
            <div className='button-input'>
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

        <div className='edicao-loja'>
          {tipoUsuario === true ? (
            <button className='botao-editar'>Editar</button>
          ) : (
            <div></div>
          )}
        </div>

      </div>

      <div className='parte-inferior-loja'>
        <div className='Listagem-dentro'>
          <div className='texto'>
            <p>
              Produtos
            </p>
            <ArrowForwardIcon />
          </div>
          <div className='org'>
            {
              produtos.map((nomeProduto) => (
                <div className='lj' key={nomeProduto} draggable='false' aria-describedby={id} onClick={abrirPopup}>
                  <img src={Fundo} draggable='false' className='img-produtos' />
                  <p className='Nome'>
                    {nomeProduto}
                  </p>
                </div>
              ))
            }
            <ProdutoVer 
							id={id}
							open={open}
							popupEstado={popupEstado}
							fecharPopup={fecharPopup}
            />
          </div>
        </div>
        <div className='Listagem-dentro'>
          <div className='texto'>
            <p>
              Produtos
            </p>
            <ArrowForwardIcon />
          </div>
          <div className='org'>
            {
              produtos.map((nomeProduto) => (
                <div className='lj' key={nomeProduto} draggable='false'>
                  <img src={Fundo} draggable='false' className='img-produtos' />
                  <p className='Nome'>
                    {nomeProduto}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
        <div className='Listagem-dentro'>
          <div className='texto'>
            <p>
              Produtos
            </p>
            <ArrowForwardIcon />
          </div>
          <div className='org'>
            {
              produtos.map((nomeProduto) => (
                <div className='lj' key={nomeProduto} draggable='false'>
                  <img src={Fundo} draggable='false' className='img-produtos' />
                  <p className='Nome'>
                    {nomeProduto}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConteudoLoja;