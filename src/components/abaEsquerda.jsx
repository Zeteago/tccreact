import './abaEsquerdaStyle.css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

function AbaEsquerda() {
    return (
        <>
        <div className='tudo'>
            <div className='title-button'>
                <div></div>
                <p>Seguindo</p>
                <div className='alinhamento-button'>
                    <button className='button-icon'>
                        <ArrowLeftIcon />
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}

export default AbaEsquerda