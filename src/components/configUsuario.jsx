import './styleConfigUsu.css'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ConfigUsuario({ trocarAba }) {
    return (
      <>
      <div className='tudo-config'>
        <button onClick={() => trocarAba('botoes')} className='voltar'>
            <ArrowRightIcon />
        </button>
      </div>
      </>  
    )
}

export default ConfigUsuario