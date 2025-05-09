import './styleConteudoPrinc.css'

import Fundo from '../assets/app/fundo.jpg'

import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from 'react';

import ProdutoVer from './popups/produtoVer';

function ConteudoPrincipal() {
	const location = useLocation();
	const message = location.state?.message;

	const navigate = useNavigate();
	
  const handleRedirect = () => {
    navigate('/', { state: { message: 'Hello from Store!' } }); // Redireciona para a rota "/home" com informações
  };

	let lojas = []

	for (var cont = 1; cont < 21; cont++) {
		lojas.push(`Loja ${cont}`)
	}

	let produtos = []

	for (var cont = 1; cont < 21; cont++) {
		produtos.push(`Produto ${cont}`)
	}
	
	//POPUP

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
			<div className="tudo-cp" >
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

				<div className='Listagem'>
					<div className='texto'>
						<p>
							Lojas da AYVU
						</p>
						<ArrowForwardIcon />
					</div>
					<div className='org'>
						{
							lojas.map((nomeLoja) => (
								<div className='lj' key={nomeLoja} draggable='false' onClick={handleRedirect}>
									<img src={Fundo} draggable='false' className='img-lojas' />
									<p className='Nome'>
										{nomeLoja}
									</p>
								</div>
							))
						}
					</div>
				</div>

				<div className='Listagem'>
					<div className='texto'>
						<p>
							Produtos
						</p>
						<ArrowForwardIcon />
					</div>
					<div className='org'>
						{
							produtos.map((nomeProduto) => (
								<div className='lj' key={nomeProduto} draggable='false' aria-describedby={id} onClick={abrirPopup}>
									<img src={Fundo} draggable='false' className='img-produtos' />
									<p className='Nome'>
										{nomeProduto}
									</p>
								</div>
							))
						}
            <ProdutoVer 
							id={id}
							open={open}
							popupEstado={popupEstado}
							fecharPopup={fecharPopup}
            />
					</div>
				</div>

				<div className='Listagem'>
					<div className='texto'>
						<p>
							Produtos
						</p>
						<ArrowForwardIcon />
					</div>
					<div className='org'>
						{
							produtos.map((nomeProduto) => (
								<div className='lj' key={nomeProduto} draggable='false' aria-describedby={id} onClick={abrirPopup}>
									<img src={Fundo} draggable='false' className='img-produtos' />
									<p className='Nome'>
										{nomeProduto}
									</p>
								</div>
							))
						}
            <ProdutoVer 
							id={id}
							open={open}
							popupEstado={popupEstado}
							fecharPopup={fecharPopup}
            />
					</div>
				</div>
				
				<div className='Listagem'>
					<div className='texto'>
						<p>
							Produtos
						</p>
						<ArrowForwardIcon />
					</div>
					<div className='org'>
						{
							produtos.map((nomeProduto) => (
								<div className='lj' key={nomeProduto} draggable='false' aria-describedby={id} onClick={abrirPopup}>
									<img src={Fundo} draggable='false' className='img-produtos' />
									<p className='Nome'>
										{nomeProduto}
									</p>
								</div>
							))
						}
            <ProdutoVer 
							id={id}
							open={open}
							popupEstado={popupEstado}
							fecharPopup={fecharPopup}
            />
					</div>
				</div>
			</div>
		</>
	)
}

export default ConteudoPrincipal