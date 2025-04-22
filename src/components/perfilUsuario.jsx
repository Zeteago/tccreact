import './stylePerfilUsu.css'

import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function PerfilUsuario({ trocarAba }) {
    return (
      <>
      <div className='tudo-perfil'>
        <button onClick={() => trocarAba('botoes')} className='voltar'>
            <ArrowRightIcon />
        </button>
      </div>
      </>  
    )
}

export default PerfilUsuario