import './produtoVerStyle.css'

import React, { useState } from 'react';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Fundo from '../../assets/app/fundo.jpg';

function ProdutoVer({
  fecharPopup,
	id,
	open,
	popupEstado
}) {
  
	const preventContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={popupEstado}
      onClose={fecharPopup}
      anchorReference="anchorPosition"
      anchorPosition={{ 
        top: window.innerHeight - ((window.innerHeight / 10) * 5), 
        left: window.innerWidth - ((window.innerWidth / 8) * 2) 
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      classes={{
        paper: 'custom-popover-produto', // Aplica a classe CSS ao Paper interno
      }}
    >
      <Typography component="divProdutoVer" sx={{ p: 2 }}>
        <div className="popup-produtoVer">
          <div className="topo">
            <p>Produto</p>
            <button onClick={fecharPopup} className='fecharPopupProduto'>
              <CloseIcon />
            </button>
          </div>
          <div className='responsividadeProdutoVer'>
            <div className='imagensDoProdutoVer'>
              <img src={Fundo} className='imagemProdutoVer' 
              onContextMenu={preventContextMenu}/>
            </div>
            <div className='InformacoesProdutoVer'>
              <div className='informacoesProdutoVer'>
                <p className='nomeProdutoVer'>Nome do Produto</p>
                <p className='descricaoProdutoVer'>Descrição do Produto</p>
                <p className='precoProdutoVer'>R$ 99,99</p>
              </div>
              <div className='botoesProdutoVer'>
                <button className='botaoComprarProdutoVer'>Comprar agora</button>
                <button className='botaoAdicionarCarrinhoProdutoVer'>Adicionar ao Carrinho</button>
              </div>
            </div>
          </div>
        </div>
      </Typography>
    </Popover>
  );
}

export default ProdutoVer;