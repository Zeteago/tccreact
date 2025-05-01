import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import './style.css'; // Importando o arquivo CSS para estilização

import Voltar from '../../assets/icones/voltar.png'; // Importando o ícone de voltar
import ConfigIcone from '../../assets/icones/configurações.png'; // Importando o ícone de configuração
import Fundo from '../../assets/app/fundo.jpg'; // Importando a imagem de fundo

function Store() {
  const navigate = useNavigate();

  const [tipoBanner, setBanner] = useState('foto-banner');

  // const handleRedirect = () => {
  //   navigate('/store', { state: { message: 'Hello from Store!' } }); // Redireciona para a rota "/home" com informações
  // };

  return (
    <div className="store">
      {/* <h1>Store</h1>
      <p>Welcome to the store!</p>
      <button onClick={handleRedirect}>Go to Home with Message</button> */}
      <div id='lateral-esquerda-store' className='laterais'>
        <div className='parte-voltar'>
          <button className='botao-voltar' onClick={() => navigate('/store')}>
            <img src={Voltar} className='voltar-icon' />
          </button>
        </div>
      </div>
      <div className='conteudo-store'>
        <div 
          className='banner-store'
          id={tipoBanner}
          style={{ backgroundImage: `url(${Fundo})` }} 
        >	
          <div 
            className='foto-store-banner' 
            src={Fundo}
            style={{ backgroundImage: `url(${Fundo})` }}
          >

          </div>
        </div>
      </div>
      <div id='lateral-direita-store' className='laterais'>
        <div className='parte-config'>
          <button className='botao-config' onClick={() => navigate('/store')}>
            <img src={ConfigIcone} className='voltar-icon' />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Store;