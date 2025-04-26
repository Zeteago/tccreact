import React, { useState } from 'react';
import './abaEsquerdaStyle.css'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function AbaEsquerda() {
	const [mostrarTudo, setMostrarTudo] = useState(true); //Esconde, setMostrarTudo mostra a aba ESQUERDAAAA

	return (
		<>
			{mostrarTudo ? (
				<div className='tudo-seg'>
					<div className='title-button'>
						<div></div>
						<p>Seguindo</p>
						<div className='alinhamento-button'>
							<button id='desativado' className='button-icon' onClick={() => setMostrarTudo(false)}>
								<ArrowLeftIcon />
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='tudo-ativado'>
					<div className='title-button'>
						<button id='ativado' className='button-icon' onClick={() => setMostrarTudo(true)}>
							<ArrowRightIcon />
						</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AbaEsquerda