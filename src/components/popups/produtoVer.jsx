import './produtoVerStyle.css';
import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'; // Favorite outline
import FavoriteIcon from '@mui/icons-material/Favorite'; // Favorite filled
import Fundo from '../../assets/app/fundo.jpg'; // Placeholder image
import { useCart } from '../../CartContext';
import { useAuth } from '../../AuthContext'; // Need user ID for favorites
import { supabase } from '../../supabaseClient'; // Need supabase client
import { useNavigate } from 'react-router-dom';

function ProdutoVer({
  fecharPopup,
  id,
  open,
  popupEstado, // Anchor element
  produto // Receive product data
}) {
  const { addItemToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  // Check favorite status when popup opens or product/user changes
  useEffect(() => {
    const checkFavorite = async () => {
      if (!open || !user || !produto) {
        setIsFavorite(false); // Reset if popup closed or no user/product
        return;
      }
      setLoadingFavorite(true);
      try {
        const { data, error } = await supabase
          .from('tb_favoritos')
          .select('id') // Just need to know if it exists
          .eq('id_cliente', user.id)
          .eq('id_produto', produto.id)
          .maybeSingle(); // Check if a favorite record exists

        if (error) throw error;
        setIsFavorite(!!data); // Set true if data exists, false otherwise
      } catch (err) {
        console.error("Erro ao verificar favorito:", err);
        // Handle error silently
      } finally {
        setLoadingFavorite(false);
      }
    };

    checkFavorite();
  }, [open, user, produto]); // Rerun when these change

  const handleAddToCart = () => {
    if (produto && user) {
      addItemToCart(produto, 1);
      setFeedback(`${produto.nome} adicionado ao carrinho!`);
      setTimeout(() => {
        setFeedback('');
        fecharPopup(); 
      }, 1500);
    } else {
      alert('Você precisa fazer o login para adicionar produtos ao carrinho.');
      setFeedback('Erro ao adicionar produto.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  const handleBuyNow = () => {
    if (produto) {
      addItemToCart(produto, 1);
      // navigate('/checkout'); // Navigate to checkout when ready
      navigate('/'); 
      fecharPopup();
    } else {
      setFeedback('Erro ao iniciar compra.');
      setTimeout(() => setFeedback(''), 1500);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user || !produto || loadingFavorite) return;
    setLoadingFavorite(true);
    try {
      if (isFavorite) {
        // Remove favorite
        const { error } = await supabase
          .from('tb_favoritos')
          .delete()
          .eq('id_cliente', user.id)
          .eq('id_produto', produto.id);
        if (error) throw error;
        setIsFavorite(false);
        setFeedback('Removido dos favoritos!');
      } else {
        // Add favorite
        const { error } = await supabase
          .from('tb_favoritos')
          .insert({ 
            id_cliente: user.id, 
            id_produto: produto.id,
            // loja_fav and produto_fav seem redundant if id_produto is present?
            // Assuming id_produto is the primary way to favorite a product.
            // If loja_fav/produto_fav are needed, adjust insert accordingly.
          });
        if (error) throw error;
        setIsFavorite(true);
        setFeedback('Adicionado aos favoritos!');
      }
      setTimeout(() => setFeedback(''), 1500);
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
      setFeedback(`Erro: ${err.message}`);
      setTimeout(() => setFeedback(''), 2000);
    } finally {
      setLoadingFavorite(false);
    }
  };

  const productName = produto?.nome || 'Nome Indisponível';
  const productDescription = produto?.descricao || 'Descrição indisponível.';
  const productPrice = produto?.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) || 'R$ --,--';
  const productImage = produto?.imagem_url || Fundo;

  return (
    <Popover
      id={id}
      open={open}
      anchorEl={popupEstado}
      onClose={fecharPopup}
      anchorReference="anchorPosition"
      anchorPosition={{ 
        top: window.innerHeight - ((window.innerHeight / 10) * 5), 
        left: window.innerWidth - ((window.innerWidth / 8) * 2) 
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      classes={{
        paper: 'custom-popover-produto', // Aplica a classe CSS ao Paper interno
      }}
    >
      <Typography component="divProdutoVer" sx={{ p: 2 }}>
        <div className="popup-produtoVer">
          <button onClick={fecharPopup} className='fecharPopupProduto'>
            <CloseIcon />
          </button>
          {/* Favorite Button */} 
          {user && produto && (
            <button 
              onClick={handleToggleFavorite} 
              className='botao-favorito-produto' 
              disabled={loadingFavorite}
              title={isFavorite ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}
            >
              {loadingFavorite ? '...' : (isFavorite ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />)}
            </button>
          )}
          <div className='responsividadeProdutoVer'>
            <div className='imagensDoProdutoVer'>
              <img src={productImage} className='imagemProdutoVer' alt={productName}/>
            </div>
            <div className='InformacoesProdutoVer'>
              <div className='informacoesProdutoVer'>
                <p className='nomeProdutoVer'>{productName}</p>
                <p className='descricaoProdutoVer'>{productDescription}</p>
                <p className='precoProdutoVer'>{productPrice}</p>
              </div>
              {feedback && <p className='feedback-message'>{feedback}</p>} 
              <div className='botoesProdutoVer'>
                <button className='botaoComprarProdutoVer' onClick={handleBuyNow} disabled={!produto || !!feedback}>
                  <ShoppingBagIcon fontSize="small"/> Comprar agora
                </button>
                <button className='botaoAdicionarCarrinhoProdutoVer' onClick={handleAddToCart} disabled={!produto || !!feedback}>
                   <AddShoppingCartIcon fontSize="small"/> Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      </Typography>
    </Popover>
  );
}

export default ProdutoVer;