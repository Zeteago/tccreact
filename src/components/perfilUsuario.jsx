import './stylePerfilUsu.css'
import React, { useState } from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';

import ImgPadrao from '../assets/app/fundo.jpg'

function PerfilUsuario({ trocarAba }) {
    const [edicao, setHabilitarEdicao] = useState(false);

    return (
      <>
      <div className='tudo-perfil'>
        <button onClick={() => trocarAba('botoes')} className='voltar'>
            <ArrowRightIcon />
        </button>
        <p className='Title-perfil'>
          Perfil do Usuário
        </p>
        <div className='onde-fica'>
          <img className='img-perfil-usu' src={ImgPadrao} draggable='false' />
        </div>
        <div className='inputs-usuario'>
          <div className='dentro-input'>
            <input placeholder="Nome" name='caixaNome' type='text'/>
            <button>
              <EditIcon />
            </button>
          </div>
          <div className='dentro-input'>
            <input placeholder="Email" name='caixaEmail' type='text'/>
            <button>
              <EditIcon />
            </button>
          </div>
          <div className='dentro-input'>
            <input placeholder="Endereco" name='caixaEndereco' type='text'/>
            <button>
              <EditIcon />
            </button>
          </div>
          <div className='dentro-input'>
            <input placeholder="Telefone" name='caixaTelefone' type='text'/>
            <button>
              <EditIcon />
            </button>
          </div>
        </div>
        <div className='botaoEditar'>
          <button onClick={() => setMostrarTudo(true)} >Editar</button>
        </div>
      </div>
      </>  
    )
}

export default PerfilUsuario