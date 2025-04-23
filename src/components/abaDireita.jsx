import './abaDireitaStyle.css'
import Carrinho from '../assets/icones/carrinho.png'
import Perfil from '../assets/icones/perfil.png'
import Config from '../assets/icones/configurações.png'
import Fundo from '../assets/app/fundo.jpg'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import React, { useState } from 'react';

import PerfilUsuario from './perfilUsuario';
import ConfigUsuario from './configUsuario';

function AbaDireita() {
    //POPUP CARRINHOO

    const [popupEstado, setPopupEstado] = useState(null);
  
    const abrirPopup = (event) => {
      setPopupEstado(event.currentTarget);
    };
  
    const fecharPopup = () => {
      setPopupEstado(null);
    };
  
    const open = Boolean(popupEstado);
    const id = open ? 'simple-popover' : undefined;

    //POPUP FINALIZAR COMPRA

    const [popupFinalizar, setPopupFinalizar] = useState(false);

    const abrirPopupFinalizar = (event) => {
        setPopupFinalizar(event.currentTarget);
    }

    const fecharPopupFinalizar = () => {
        setPopupFinalizar(null);
    }

    const openFinalizar = Boolean(popupFinalizar);
    const idFinalizar = openFinalizar ? 'simple-popover' : undefined;

    //MOSTRARRRRR

    const [opcao, setOpcao] = useState('botoes');

    const trocarAba = (novaOpcao) => {
        setOpcao(novaOpcao); // Atualiza o estado para a nova aba
    };

    return (
        <>
        {opcao === 'perfil' ? (
                <PerfilUsuario trocarAba={trocarAba} />
            ) : opcao === 'config' ? (
                <ConfigUsuario trocarAba={trocarAba} />
            ) : (
                <div className='tudo'>
                <div className='buttons'>
                    <button aria-describedby={id} variant="contained" onClick={abrirPopup}>
                        <img src={Carrinho} className='icone' draggable='false'/>
                    </button>
    
                    <Popover 
                        id={id}
                        open={open}
                        anchorEl={popupEstado}
                        onClose={fecharPopup}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: 0, left: window.innerWidth - window.innerWidth/5 }}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'center',
                            horizontal: 'right',
                        }}
                        className="custom-popover"
                        >
                        <Typography component="div" sx={{ p: 2 }}>
                        <div className='popup-carrinho'>    
                            <div className='topo'>
                                <p>Carrinho</p>
                                <button onClick={fecharPopup}>
                                    <CloseIcon />
                                </button>
                            </div>
                            <div className='loja'>
                                <div className='icone-conteudo'>
                                    <img src={Fundo} draggable='false'/>
                                    <div className='conteudo'>
                                        <div className='info'>
                                            <p>NOME Loja Store</p>
                                            <h6>Estrela 5.0 | Hora de funcionamento</h6>
                                        </div>
                                        <div className='tres-pontos'>
                                            <button>
                                                <MoreHorizIcon />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className='produto-conteudo'>
                                    <img src={Fundo} draggable='false'/>
                                    <div className='conteudo'>
                                        <div className='info'>
                                            <h6>Produto</h6>
                                            <p>NOME Produto</p>
                                            <h6>Adicionais: N/A | Quantidade: 3</h6>
                                        </div>
                                        <p className='preco'>
                                            R$98,80
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className='baixo'>
                                <p>Total: R$190,80</p>
                                <button aria-describedby={id} variant="contained" onClick={abrirPopupFinalizar}>Finalizar Compra</button>

                                <Popover 
                                    id={idFinalizar}
                                    open={openFinalizar}
                                    anchorEl={popupFinalizar}
                                    onClose={fecharPopupFinalizar}
                                    anchorReference="anchorPosition"
                                    anchorPosition={{ top: 0, left: window.innerWidth - window.innerWidth/5 }}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'center',
                                        horizontal: 'right',
                                    }}
                                    className="custom-popover"
                                    >
                                    <Typography component="div" sx={{ p: 2 }}>
                                    <div className='popup-finalizar'>    
                                        <div className='topo'>
                                            <p>Método de pagamento</p>
                                            <button onClick={fecharPopupFinalizar}>
                                                <CloseIcon  className='close-icon'/>
                                            </button>
                                        </div>
                                    </div>
                                    </Typography>
                                </Popover>
                            </div>
                        </div>
                        </Typography>
                    </Popover>
    
                    <button onClick={() => setOpcao('perfil')}>
                        <img src={Perfil} className='icone' draggable='false'/>
                    </button>
                    <button onClick={() => setOpcao('config')}>
                        <img src={Config} className='icone' draggable='false'/>
                    </button>
                </div>
            </div>
            )
        }
        
        </>
    )
}

export default AbaDireita