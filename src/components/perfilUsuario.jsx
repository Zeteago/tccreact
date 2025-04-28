import './stylePerfilUsu.css'
import React, { useState } from 'react';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import EditIcon from '@mui/icons-material/Edit';

import ImgPadrao from '../assets/app/fundo.jpg'

function PerfilUsuario({ trocarAba }) {
  const [classe, setClass] = useState('mostrar')

  const [pessoaFake, setPessoaFake] = useState([
    'Julio',
    'julio@gmail.com',
    'rua rubi 28',
    '14999999999'
  ])

  const [nome, setNome] = useState(pessoaFake[0]);
  const [email, setEmail] = useState(pessoaFake[1]);
  const [endereco, setEndereco] = useState(pessoaFake[2]);
  const [telefone, setTelefone] = useState(pessoaFake[3]);

  function Confirmar() {
    setPessoaFake(
      [nome, email, endereco, telefone]
    )

    setClass('mostrar')
  }

  function Voltar() {
    setNome(pessoaFake[0])
    setEmail(pessoaFake[1])
    setEndereco(pessoaFake[2])
    setTelefone(pessoaFake[3])

    setClass('mostrar')
  }

  const phoneMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    value = value.replace(/(\d{2})(\d)/, "($1) $2"); // Formata o DDD
    value = value.replace(/(\d)(\d{4})$/, "$1-$2"); // Adiciona o hífen no número
    return value;
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const maskedValue = phoneMask(inputValue);
    setTelefone(maskedValue); // Atualiza o estado com o valor formatado
  };

  return (
    <>
      <div className='tudo-perfil'>
        <button onClick={() => trocarAba('botoes')} className='voltar'>
          <ArrowRightIcon />
        </button>
        <p className='Title-perfil'>
          Perfil do Usuário
        </p>
          {
            classe === 'editar' ? (
              <div className='onde-fica'>
                <img className='img-perfil-usu' src={ImgPadrao} draggable='false' />
              <EditIcon className='img-perfil-usu-edit' />
              </div>
            ) : (
              <div className='onde-fica'>
                <img className='img-perfil-usu' src={ImgPadrao} draggable='false' />
              </div>
            )
          }
        <div className='inputs-usuario'>
          <div className={classe}>
            {
              classe === 'editar' ? (
                <div className='dentro-input'>
                  <input
                    placeholder="Nome"
                    name='caixaNome'
                    type='text'
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                  <button>
                    <EditIcon />
                  </button>
                </div>
              ) : (
                <p><b>Nome: </b>{pessoaFake[0]}</p>
              )
            }
          </div>
          <div className={classe}>
            {
              classe === 'editar' ? (
                <div className='dentro-input'>
                  <input
                    placeholder="Email"
                    name='caixaEmail'
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <button>
                    <EditIcon />
                  </button>
                </div>
              ) : (
                <p><b>Email: </b>{pessoaFake[1]}</p>
              )
            }
          </div>
          <div className={classe}>
            {
              classe === 'editar' ? (
                <div className='dentro-input'>
                  <input
                    placeholder="Endereco"
                    name='caixaEndereco'
                    type='text'
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                  />
                  <button>
                    <EditIcon />
                  </button>
                </div>
              ) : (
                <p><b>Endereço: </b>{pessoaFake[2]}</p>
              )
            }
          </div>
          <div className={classe}>
            {
              classe === 'editar' ? (
                <div className='dentro-input'>
                  <input
                    placeholder="Telefone"
                    name='caixaTelefone'
                    value={telefone}
                    type="tel"
                    onChange={handleChange} // Manipula as mudanças no input
                    maxLength="15" // Limita o comprimento máximo
                  />
                  <button>
                    <EditIcon />
                  </button>
                </div>
              ) : (
                <p><b>Telefone: </b>{pessoaFake[3]}</p>
              )
            }
          </div>
        </div>
        {
          classe === 'mostrar' ? (

            <div className='botaoEditar'>
              <button onClick={() => setClass('editar')} >Editar</button>
            </div>
          ) : (
            <div className='botaoEditar'>
              <button onClick={Voltar} >Voltar</button>
              <button onClick={Confirmar} >Confirmar</button>
            </div>

          )
        }
      </div>
    </>
  )
}

export default PerfilUsuario