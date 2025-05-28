import React, { useRef, useState, useEffect } from 'react';
import './styleConteudoLoja.css';
import Fundo from '../../assets/app/fundo.jpg'; // Placeholder image
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Icon for follow
import FavoriteIcon from '@mui/icons-material/Favorite'; // Icon for unfollow
import ProdutoVer from '../popups/produtoVer'; // Popup para ver detalhes do produto
import { supabase } from '../../supabaseClient'; // Importar supabase
import { useAuth } from '../../AuthContext'; // Para verificar tipo de usuário e ID

// Labels para avaliação (mantido do código original)
const labels = {
  0.5: 'Péssimo', 1: 'Péssimo+', 1.5: 'Ruim', 2: 'Ruim+', 2.5: 'Razoável',
  3: 'Razoável+', 3.5: 'Bom', 4: 'Bom+', 4.5: 'Excelente', 5: 'Excelente+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

// Componente para exibir um card de produto
const ProdutoCard = ({ produto, onProdutoClick }) => {
  return (
    <div className='lj' key={produto.id} draggable='false' onClick={() => onProdutoClick(produto)} title={produto.nome}>
      {/* TODO: Usar imagem real do produto (ex: produto.imagem_url) */}
      <img src={Fundo} draggable='false' className='img-produtos' alt={produto.nome} />
      <p className='Nome'>
        {produto.nome}
      </p>
      <p className='Preco'>
        R$ {produto.preco?.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || '0,00'}
      </p>
      {/* TODO: Adicionar botão "Adicionar ao Carrinho" aqui? */}
    </div>
  );
};

// Componente principal que recebe dados da loja e produtos
function ConteudoLoja({ loja, produtos }) {
  const { user } = useAuth(); // Get current user
  const [value, setValue] = useState(loja?.avaliacao_media || 4); // Usar avaliação da loja ou default
  const [hover, setHover] = useState(-1);
  const [tipoUsuario, setTipoUsuario] = useState(false); // false = cliente (conforme original)
  const inputBuscaRef = useRef(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [produtosFiltrados, setProdutosFiltrados] = useState(produtos);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  // Estado para o popup de visualização do produto
  const [popupAnchorEl, setPopupAnchorEl] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  // Check if user is following this store
  useEffect(() => {
    const checkFollowingStatus = async () => {
      if (!user || !loja) return;
      setLoadingFollow(true);
      try {
        const { data: cliente, error } = await supabase
          .from('tb_cliente')
          .select('Seguindo')
          .eq('id', user.id)
          .single();
        
        if (error) throw error;

        const followedStores = cliente?.Seguindo ? cliente.Seguindo.split(',').map(id => id.trim()) : [];
        setIsFollowing(followedStores.includes(String(loja.id))); // Ensure comparison is correct type

      } catch (err) {
        console.error("Erro ao verificar se segue a loja:", err);
        // Handle error silently or show a message
      } finally {
        setLoadingFollow(false);
      }
    };
    checkFollowingStatus();
  }, [user, loja]);

  // Atualiza produtos filtrados quando a lista original ou o termo de busca mudam
  useEffect(() => {
    if (!termoBusca) {
      setProdutosFiltrados(produtos);
    } else {
      const termoLower = termoBusca.toLowerCase();
      setProdutosFiltrados(
        produtos.filter(p => 
          p.nome.toLowerCase().includes(termoLower) || 
          (p.descricao && p.descricao.toLowerCase().includes(termoLower))
        )
      );
    }
  }, [produtos, termoBusca]);

  const handleBuscaKeyDown = (event) => {
    if (event.key === 'Enter') {
      setTermoBusca(inputBuscaRef.current?.value || '');
    }
  };

  const handleBuscaClick = () => {
    setTermoBusca(inputBuscaRef.current?.value || '');
  };

  // Funções para o popup de produto
  const abrirPopupProduto = (event, produto) => {
    setProdutoSelecionado(produto);
    setPopupAnchorEl(event.currentTarget);
  };

  const fecharPopupProduto = () => {
    setPopupAnchorEl(null);
    setProdutoSelecionado(null); 
  };

  const openPopup = Boolean(popupAnchorEl);
  const popupId = openPopup ? 'produto-popover' : undefined;

  // Função para seguir/deixar de seguir a loja
  const handleFollowToggle = async () => {
    if (!user || !loja || loadingFollow) return;
    setLoadingFollow(true);

    try {
      // 1. Get current followed stores
      const { data: cliente, error: fetchError } = await supabase
        .from('tb_cliente')
        .select('Seguindo')
        .eq('id', user.id)
        .single();

      if (fetchError) throw fetchError;

      let followedStores = cliente?.Seguindo ? cliente.Seguindo.split(',').map(id => id.trim()).filter(id => id) : [];
      const storeIdStr = String(loja.id);
      let newFollowingList;
      let newFollowerCount = loja.seguidores || 0;

      if (isFollowing) {
        // Unfollow
        newFollowingList = followedStores.filter(id => id !== storeIdStr);
        newFollowerCount = Math.max(0, newFollowerCount - 1); // Decrement followers
      } else {
        // Follow
        if (!followedStores.includes(storeIdStr)) {
            followedStores.push(storeIdStr);
        }
        newFollowingList = followedStores;
        newFollowerCount += 1; // Increment followers
      }

      const newFollowingString = newFollowingList.join(',');

      // 2. Update tb_cliente
      const { error: updateClientError } = await supabase
        .from('tb_cliente')
        .update({ Seguindo: newFollowingString })
        .eq('id', user.id);

      if (updateClientError) throw updateClientError;

      // 3. Update tb_lojas follower count (Optional but good for consistency)
      const { error: updateStoreError } = await supabase
        .from('tb_lojas')
        .update({ seguidores: newFollowerCount })
        .eq('id', loja.id);
        
      if (updateStoreError) {
          // Log error but don't necessarily block UI update
          console.error("Erro ao atualizar contagem de seguidores da loja:", updateStoreError);
      }

      // Update UI state
      setIsFollowing(!isFollowing);
      // Update local store data follower count if needed
      // setStoreData(prev => ({ ...prev, seguidores: newFollowerCount })); // Requires storeData to be state

    } catch (err) {
      console.error("Erro ao seguir/deixar de seguir:", err);
      alert(`Erro: ${err.message}`);
    } finally {
      setLoadingFollow(false);
    }
  };

  // Renderiza a seção de produtos
  const renderProdutos = () => {
    if (!produtosFiltrados || produtosFiltrados.length === 0) {
      return <div className="no-results-message">Nenhum produto encontrado {termoBusca ? 'para esta busca' : ''}.</div>;
    }
    return (
      <div className='org'>
        {produtosFiltrados.map((produto) => (
          <ProdutoCard 
            key={produto.id} 
            produto={produto} 
            onProdutoClick={(p) => abrirPopupProduto(event, p)} // Passa o produto e o evento
          />
        ))}
      </div>
    );
  };

  return (
    <div className="td-conteudo-loja">
      {/* Informações da Loja */}
      <div className='parte-superior-loja'>
        <div className='parte-esquerda-loja'>
          <p className='nome-loja'>{loja?.nome || 'Nome da Loja'}</p>
          <p className='categoria-loja'>{(`${loja?.categorias[0]} e ${loja?.categorias[1]}`) || 'Categorias'}</p>
          <div className='seguidores-container'>
            <p className='seguidores'>Seguidores: {loja?.seguidores || 0}</p>
            {user && loja && (
              <button 
                className='botao-seguir' 
                onClick={handleFollowToggle} 
                disabled={loadingFollow}
                title={isFollowing ? 'Deixar de Seguir' : 'Seguir Loja'}
              >
                {loadingFollow ? '...' : (isFollowing ? <FavoriteIcon color="error"/> : <FavoriteBorderIcon />)}
              </button>
            )}
          </div>
        </div>
        <div className='parte-descricao-loja'>
          <p className='descricao-loja'>{loja?.descricao || 'Descrição da loja...'}</p>
        </div>
        <div className='parte-avaliacao-loja'>
          <div className='Estrelas'>
            <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }} className='Avaliacao-loja'>
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                  // TODO: Implementar envio de avaliação do cliente?
                }}
                onChangeActive={(event, newHover) => setHover(newHover)}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
              {value !== null && (
                <Box sx={{ ml: 2, margin: 0 }}>{labels[hover !== -1 ? hover : value]}</Box>
              )}
            </Box>
          </div>
          {/* TODO: Usar contagem real de avaliações */}
          <p className='quantidade-avaliacao'>{loja?.num_avaliacoes || 0} avaliações</p> 
        </div>
      </div>

      {/* Controles (Filtro, Busca, Adicionar) */}
      <div className='parte-meio-loja'>
        <div className='filtro-adicionar'>
          <button className='botao-filtro'>
            Filtrar
            <MenuIcon className="menu-icon" />
          </button>
          {/* Lógica de Adicionar Produto/Avaliação - Mantida como no original, mas precisa de revisão 
              pois dono não loga aqui e cliente não adiciona produto */}
          {tipoUsuario === true ? (
            <button className='botao-adicionar'>Adicionar Produto</button>
          ) : (
            <button className='botao-adicionar'>Adicionar Avaliação</button>
          )}
        </div>
        <div className='pesquisa-loja
'>
          <div className='input-container'>
            <div className='button-input'>
              <input
                placeholder="Buscar na loja..."
                name='caixaPesquisaLoja'
                type='text'
                ref={inputBuscaRef}
                onKeyDown={handleBuscaKeyDown}
              />
            </div>
            <button className='search' onClick={handleBuscaClick}>
              <SearchIcon className="search-icon" />
            </button>
          </div>
        </div>
        <div className='edicao-loja'>
          {/* Botão Editar só deve aparecer para o dono da loja (lógica a implementar) */}
          {tipoUsuario === true && <button className='botao-editar'>Editar</button>}
        </div>
      </div>

      {/* Listagem de Produtos */}
      <div className='parte-inferior-loja'>
        <div className='Listagem-dentro'>
          <div className='texto'>
            <p>Produtos</p>
            {/* <ArrowForwardIcon /> */}
          </div>
          {renderProdutos()}
        </div>
        {/* TODO: Adicionar paginação ou scroll infinito se houver muitos produtos */}
      </div>

      {/* Popup de Visualização do Produto */}
      {produtoSelecionado && (
          <ProdutoVer 
            id={popupId}
            open={openPopup}
            popupEstado={popupAnchorEl} // Passa o elemento âncora
            fecharPopup={fecharPopupProduto}
            produto={produtoSelecionado} // Passa os dados do produto selecionado
            // TODO: Passar função para adicionar ao carrinho
          />
      )}
    </div>
  );
}

export default ConteudoLoja;

