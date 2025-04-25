import './abaDireitaStyle.css';
import Carrinho from '../../assets/icones/carrinho.png';
import Perfil from '../../assets/icones/perfil.png';
import Config from '../../assets/icones/configurações.png';

import React, { useState } from 'react';

import PerfilUsuario from '../perfilUsuario';
import ConfigUsuario from '../configUsuario';

import PopupCarrinho from '../popups/popupCarrinho';

function AbaDireita() {
    // POPUP CARRINHO
    const [popupEstado, setPopupEstado] = useState(null);

    const abrirPopup = (event) => {
        setPopupEstado(event.currentTarget);
    };

    const fecharPopup = () => {
        setPopupEstado(null);
    };

    const open = Boolean(popupEstado);
    const id = open ? 'simple-popover' : undefined;

    // POPUP FINALIZAR COMPRA
    const [popupFinalizar, setPopupFinalizar] = useState(null);

    const abrirPopupFinalizar = (event) => {
        setPopupFinalizar(event.currentTarget);
    };

    const fecharPopupFinalizar = () => {
        setPopupFinalizar(null);
    };

    const openFinalizar = Boolean(popupFinalizar);
    const idFinalizar = openFinalizar ? 'simple-popover' : undefined;

    // MOSTRAR ABAS
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
                <div className="tudo">
                    <div className="buttons">
                        <button aria-describedby={id} onClick={abrirPopup}>
                            <img src={Carrinho} className="icone" draggable="false" />
                        </button>
                        <PopupCarrinho
                            id={id}
                            open={open}
                            popupEstado={popupEstado}
                            fecharPopup={fecharPopup}
                            abrirPopupFinalizar={abrirPopupFinalizar}
                            fecharPopupFinalizar={fecharPopupFinalizar}
                            idFinalizar={idFinalizar}
                            openFinalizar={openFinalizar}
                            popupFinalizar={popupFinalizar}
                        />

                        <button onClick={() => setOpcao('perfil')}>
                            <img src={Perfil} className="icone" draggable="false" />
                        </button>
                        <button onClick={() => setOpcao('config')}>
                            <img src={Config} className="icone" draggable="false" />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default AbaDireita;