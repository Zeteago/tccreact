import React from 'react';
import './styleConteudoPrinc.css';
import Fundo from '../assets/app/fundo.jpg'; // Placeholder image
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import ProdutoVer from './popups/produtoVer'; // Assuming this is for viewing product details

// Componente para exibir um único card de loja
const LojaCard = ({ loja }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    // Navega para a página da loja específica
    navigate(`/store/${loja.id}`); 
  };

  return (
    <div className='lj' key={loja.id} draggable='false' onClick={handleRedirect} title={loja.nome}>
      {/* TODO: Usar imagem real da loja (ex: loja.banner_url ou um placeholder) */}
      <img src={Fundo} draggable='false' className='img-lojas' alt={loja.nome} />
      <p className='Nome'>
        {loja.nome}
      </p>
      {/* TODO: Adicionar mais informações se necessário (ex: avaliação, tipo) */}
    </div>
  );
};

// Componente principal que recebe os dados das lojas
function ConteudoPrincipal({ lojas, loading, error, tipo }) {
  
  // TODO: Implementar popup de visualização de produto (ProdutoVer)
  // Atualmente, este componente foca em listar lojas.
  // A listagem de produtos pode pertencer à página da loja ou a uma seção diferente.
  const [popupEstado, setPopupEstado] = React.useState(null);
  const abrirPopup = (event) => setPopupEstado(event.currentTarget);
  const fecharPopup = () => setPopupEstado(null);
  const open = Boolean(popupEstado);
  const id = open ? 'simple-popover' : undefined;

  const renderContent = () => {
    if (loading) {
      return <div className="loading-message">Carregando lojas...</div>;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    if (!lojas || lojas.length === 0) {
      return <div className="no-results-message">Nenhuma loja encontrada.</div>;
    }

    // Determina o título da seção com base no tipo
    let tituloSecao = "Lojas da AYVU";
    if (tipo === 'food') tituloSecao = "Restaurantes e Lanches";
    if (tipo === 'commerce') tituloSecao = "Lojas e Comércio";
    if (tipo === 'busca') tituloSecao = "Resultados da Busca";

    return (
      <div className='Listagem'>
        <div className='texto'>
          <p>{tituloSecao}</p>
          <ArrowForwardIcon />
        </div>
        <div className='org'>
          {lojas.map((loja) => (
            <LojaCard key={loja.id} loja={loja} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="tudo-cp">
        {/* O Banner parece ser estático ou ter lógica própria, mantido por enquanto */}
        <div className="Banner">
          <p className='titulo'>AYVU Marketplace</p> {/* Placeholder */} 
          <p className='sub-titulo'>Comida e Comércio, perto de você.</p> {/* Placeholder */} 
          <div className='botoes'>
            <button>
              <TrendingUpIcon />
              <p className='texto'>Em alta</p>
            </button>
            <button className='distancia'>
              <DirectionsWalkIcon />
              <p className='texto'> Perto de você</p> {/* TODO: Implementar geolocalização? */}
            </button>
          </div>
        </div>

        {/* Renderiza a lista de lojas ou mensagens de estado */}
        {renderContent()}
        
        <div className='Listagem'>
          <div className='texto'>
            <p>Produtos em Destaque</p>
            <ArrowForwardIcon />
          </div>
          <div className='org'>
            { // Mapear produtos reais aqui quando a lógica for definida
              [1, 2, 3, 4, 5].map((prodId) => (
                <div className='lj' key={prodId} draggable='false' aria-describedby={id} onClick={abrirPopup}>
                  <img src={Fundo} draggable='false' className='img-produtos' alt={`Produto ${prodId}`}/>
                  <p className='Nome'>Produto {prodId}</p>
                </div>
              ))
            }
            <ProdutoVer 
              id={id}
              open={open}
              popupEstado={popupEstado}
              fecharPopup={fecharPopup}
              // TODO: Passar dados do produto selecionado para o popup
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ConteudoPrincipal;

