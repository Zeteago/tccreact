import './abaDireitaStyle.css'
import Carrinho from '../assets/icones/carrinho.png'
import Perfil from '../assets/icones/perfil.png'
import Config from '../assets/icones/configurações.png'
import Fundo from '../assets/app/fundo.jpg'

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/Pix';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

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
                                            <div className='botao-sair'>
                                                <p className='subtitulo-pagamento'>Método de pagamento</p>
                                                <button onClick={fecharPopupFinalizar}>
                                                    <CloseIcon  className='close-icon'/>
                                                </button>
                                            </div>
                                            <div className='escolha-pagamento'>
                                                <FormControl>
                                                    <FormLabel 
                                                        id="demo-row-radio-buttons-group-label"
                                                        sx={{
                                                            color: 'grey', // Cor padrão
                                                            fontSize: '18px',
                                                            '&.Mui-focused': { color: '#E88099' }, // Cor quando o Radio Button correspondente é selecionado
                                                        }}
                                                    >
                                                        Forma
                                                    </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                                        name="row-radio-buttons-group"
                                                        className='radio-group'
                                                    >
                                                        <FormControlLabel 
                                                            value="cartao" 
                                                            control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} 
                                                            label={<div className='simbol-forma'>
                                                                <CreditCardIcon />Cartão</div>}
                                                         />
                                                        <FormControlLabel 
                                                            value="pix" 
                                                            control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} 
                                                            label={<div className='simbol-forma'>
                                                                <PixIcon /> Pix</div>} 
                                                        />
                                                        <FormControlLabel 
                                                            value="dinheiro" 
                                                            control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} 
                                                            label={<div className='simbol-forma'>
                                                                <LocalAtmIcon /> Dinheiro</div>} 
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
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