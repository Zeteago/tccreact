import './carrinhoStyle.css';
import React from 'react';

import Fundo from '../../assets/app/fundo.jpg';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import PopupPagamento from './popupPagamento';

function PopupCarrinho({
    fecharPopup,
    id,
    open,
    popupEstado,
    abrirPopupFinalizar,
    fecharPopupFinalizar,
    idFinalizar,
    openFinalizar,
    popupFinalizar,
}) {
    return (
        <Popover
            id={id}
            open={open}
            anchorEl={popupEstado}
            onClose={fecharPopup}
            anchorReference="anchorPosition"
            anchorPosition={{ top: 0, left: window.innerWidth - window.innerWidth / 5 }}
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
                <div className="popup-carrinho">
                    <div className="topo">
                        <p>Carrinho</p>
                        <button onClick={fecharPopup}>
                            <CloseIcon />
                        </button>
                    </div>
                    <div className="loja">
                        <div className="icone-conteudo">
                            <img src={Fundo} draggable="false" />
                            <div className="conteudo">
                                <div className="info">
                                    <p>NOME Loja Store</p>
                                    <h6>Estrela 5.0 | Hora de funcionamento</h6>
                                </div>
                                <div className="tres-pontos">
                                    <button>
                                        <MoreHorizIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="produto-conteudo">
                            <img src={Fundo} draggable="false" />
                            <div className="conteudo">
                                <div className="info">
                                    <h6>Produto</h6>
                                    <p>NOME Produto</p>
                                    <h6>Adicionais: N/A | Quantidade: 3</h6>
                                </div>
                                <p className="preco">R$98,80</p>
                            </div>
                        </div>
                    </div>
                    <div className="baixo">
                        <p>Total: R$190,80</p>
                        <button aria-describedby={idFinalizar} onClick={abrirPopupFinalizar}>
                            Finalizar Compra
                        </button>

                        <PopupPagamento
                            idFinalizar={idFinalizar}
                            openFinalizar={openFinalizar}
                            popupFinalizar={popupFinalizar}
                            fecharPopupFinalizar={fecharPopupFinalizar}
                        />
                    </div>
                </div>
            </Typography>
        </Popover>
    );
}

export default PopupCarrinho;