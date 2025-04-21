import './styleConteudoPrinc.css'

import Fundo from '../assets/app/fundo.jpg'

import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

function ConteudoPrincipal() {

    let lojas = ['loja1', 'loja2', 'loja3', 'loja4', 'loja5', 'loja6',
        'loja7', 'loja8', 'loja9', 'loja10', 'loja11', 'loja12', 'loja13',
        'loja14', 'loja15', 'loja16'
    ]

    return (
        <>
        <div className="tudo-cp">
            <div className="Banner">
                <p className='titulo'>TITULO</p>
                <p className='sub-titulo'>Subtitulo</p>
                <div className='botoes'>
                    <button>
                        <TrendingUpIcon />
                        <p className='texto'>Em alta</p>
                    </button>
                    <button className='distancia'>
                        <DirectionsWalkIcon />
                        <p className='texto'> 12 minutos de você</p>
                    </button>
                </div>
            </div>

            <div className='Lojas'>
                <div className='texto'>
                    <p>
                        Lojas da AYVU
                    </p>
                    <ArrowForwardIcon />
                </div>
                <div className='orgLojas'>
                    {
                        lojas.map((nomeLoja) => (
                            <div className='lj' key={nomeLoja}>
                                <img src={Fundo} draggable='false'/>
                                <p className='Nome'>
                                    {nomeLoja}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default ConteudoPrincipal