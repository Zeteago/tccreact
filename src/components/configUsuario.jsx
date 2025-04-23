import './styleConfigUsu.css'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ConfigUsuario({ trocarAba }) {
    return (
      <>
      <div className='tudo-config'>
        <button onClick={() => trocarAba('botoes')} className='voltar'>
            <ArrowRightIcon />
        </button>
        <p className='Title-config'>
          Configurações
        </p>
      </div>
      </>  
    )
}

export default ConfigUsuario