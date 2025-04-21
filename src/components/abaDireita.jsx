import './abaDireitaStyle.css'
import Carrinho from '../assets/icones/carrinho.png'
import Perfil from '../assets/icones/perfil.png'
import Config from '../assets/icones/configurações.png'
import Fundo from '../assets/app/fundo.jpg'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { useState } from 'react'

function AbaDireita() {
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
        <>
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
                    anchorPosition={{ top: 0, left: 1250 }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    className="custom-popover"
                    >
                    <Typography component="div" sx={{ p: 2 }}>
                    <div className='popup-carrinho'>    
                        <div className='topo'>
                            <p>Carrinho</p>
                            <button>
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
                                        <p>NOME Loja Store</p>
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
                            <button>Finalizar Compra</button>
                        </div>
                    </div>
                    </Typography>
                </Popover>

                <button>
                    <img src={Perfil} className='icone' draggable='false'/>
                </button>
                <button>
                    <img src={Config} className='icone' draggable='false'/>
                </button>
            </div>
        </div>
        </>
    )
}

export default AbaDireita