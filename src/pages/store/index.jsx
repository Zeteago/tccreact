import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'; // Importando o arquivo CSS para estilização

import Voltar from '../../assets/icones/voltar.png'; // Importando o ícone de voltar
import ConfigIcone from '../../assets/icones/configurações.png'; // Importando o ícone de configuração
import Fundo from '../../assets/app/fundo.jpg'; // Importando a imagem de fundo

import Conteudo from '../../components/telaloja/conteudoLoja.jsx'; // Importando o componente de conteúdo da loja 

import SimpleBottomNavigation from '../../components/barraNav'
import { useMediaQuery } from '@mui/material'; // Importa o hook useMediaQuery

function Store() {
  // Verifica se a tela é menor que 720px
  const isMobile = useMediaQuery('(max-width: 720px)');


  const navigate = useNavigate();

  const [tipoBanner, setTipoBanner] = useState('foto-banner');
  const [corBanner, setCorBanner] = useState('#e88099'); 

  // const handleRedirect = () => {
  //   navigate('/store', { state: { message: 'Hello from Store!' } }); // Redireciona para a rota "/home" com informações
  // };

  return (
    <>
    <div className="store">
      {/* <h1>Store</h1>
      <p>Welcome to the store!</p>
      <button onClick={handleRedirect}>Go to Home with Message</button> 
      
      <div className="configuracoes-banner">
          <button onClick={() => setTipoBanner('foto-banner')}>Usar Foto</button>
          <button onClick={() => setTipoBanner('cor-banner')}>Usar Cor</button>
        </div>
      */}
      <div id='lateral-esquerda-store' className='laterais'>
        <div className='parte-voltar'>
          <button className='botao-voltar' onClick={() => navigate('/store')}>
            <img src={Voltar} className='voltar-icon' />
          </button>
        </div>
      </div>

      <div className='conteudo-store'>
        <div 
          className={`banner-store ${tipoBanner}`}
          style={{
            backgroundImage: tipoBanner === 'foto-banner' ? `url(${Fundo})` : 'none',
            backgroundColor: tipoBanner === 'cor-banner' ? corBanner : 'transparent',
          }} 
        >
          <div 
            className='foto-store-banner' 
            src={Fundo}
            style={{ backgroundImage: `url(${Fundo})` }}
          ></div>
        </div>
        <Conteudo />
      </div>

      <div id='lateral-direita-store' className='laterais'>
        <div className='parte-config'>
          <button className='botao-config' onClick={() => navigate('/store')}>
            <img src={ConfigIcone} className='voltar-icon' />
          </button>
        </div>
      </div>
    </div>
    {/* Renderiza a barra de navegação apenas se for mobile */}
    {isMobile && <div className="bottom-navigation"><SimpleBottomNavigation /></div>}
    </>
  );
}

export default Store;