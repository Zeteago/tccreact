import './abaDireitaStyle.css'
import Carrinho from '../assets/icones/carrinho.png'
import Perfil from '../assets/icones/perfil.png'
import Config from '../assets/icones/configurações.png'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

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
                    anchorPosition={{ top: 0, left: 1350 }}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                >
                    <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
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