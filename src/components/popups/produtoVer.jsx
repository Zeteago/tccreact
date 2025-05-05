import './produtoVerStyle.css'

import React, { useState } from 'react';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

function ProdutoVer({
  fecharPopup,
	id,
	open,
	popupEstado
}) {
  return (
    <Popover
      id={id}
      open={open}
      anchorEl={popupEstado}
      onClose={fecharPopup}
      anchorReference="anchorPosition"
      anchorPosition={{ top: 0, left: window.innerWidth - (window.innerWidth / 5) }}
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
        <div className="popup-produtoVer">
          <div className="topo">
            <p>Produto</p>
            <button onClick={fecharPopup}>
              <CloseIcon />
            </button>
          </div>
        </div>
      </Typography>
    </Popover>
  );
}

export default ProdutoVer;