import './carrinhoStyle.css';
import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete'; // Icon to remove item
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Fundo from '../../assets/app/fundo.jpg'; // Placeholder image
import PopupPagamento from './popupPagamento';
import { useCart } from '../../CartContext'; // Import useCart
import { supabase } from '../../supabaseClient'; // Import supabase to fetch store details

const groupItemsByStore = (items) => {
  return items.reduce((acc, item) => {
    const storeId = item.id_loja;
    if (!acc[storeId]) {
      acc[storeId] = [];
    }
    acc[storeId].push(item);
    return acc;
  }, {});
};

function PopupCarrinho({
	fecharPopup,
	id,
	open,
	popupEstado,
	abrirPopupFinalizar,
	fecharPopupFinalizar,
	idFinalizar,
	openFinalizar,
	popupFinalizar,
}) {
  const { 
    cartItems, 
    removeItemFromCart, 
    updateItemQuantity, 
    getCartTotal 
  } = useCart();
  
  const [groupedItems, setGroupedItems] = useState({});
  const [storeDetails, setStoreDetails] = useState({});
  const [loadingStores, setLoadingStores] = useState(false);

  // Group items and fetch store details whenever cartItems change
  useEffect(() => {
    const grouped = groupItemsByStore(cartItems);
    setGroupedItems(grouped);

    const storeIds = Object.keys(grouped);
    if (storeIds.length > 0) {
      setLoadingStores(true);
      const fetchDetails = async () => {
        try {
          const { data, error } = await supabase
            .from('tb_lojas')
            .select('id, nome, banner_url') // Select needed store details
            .in('id', storeIds);
          
          if (error) throw error;

          const detailsMap = data.reduce((acc, store) => {
            acc[store.id] = store;
            return acc;
          }, {});
          setStoreDetails(detailsMap);
        } catch (err) {
          console.error("Erro ao buscar detalhes das lojas do carrinho:", err);
          // Handle error appropriately
        } finally {
          setLoadingStores(false);
        }
      };
      fetchDetails();
    } else {
      setStoreDetails({}); // Clear details if cart is empty
    }
  }, [cartItems]);

  const handleQuantityChange = (itemId, delta) => {
    const item = cartItems.find(i => i.id === itemId);
    if (item) {
      updateItemQuantity(itemId, item.quantidade + delta);
    }
  };

	return (
		<Popover
			id={id}
			open={open}
			anchorEl={popupEstado}
			onClose={fecharPopup}
			anchorReference="anchorPosition"
			anchorPosition={{ top: 0, left: window.innerWidth - window.innerWidth / 5 }}
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			transformOrigin={{
				vertical: 'center',
				horizontal: 'right',
			}}
			className="custom-popover"
		>
			<Typography component="div" sx={{ p: 2 }}>
        <div className="popup-carrinho">
          <div className="topo">
            <p>Carrinho</p>
            <button onClick={fecharPopup} className='botao-fechar-carrinho'>
              <CloseIcon />
            </button>
          </div>

          <div className="itens-carrinho-container"> {/* Scrollable container */} 
            {loadingStores && <p>Carregando...</p>}
            {!loadingStores && Object.keys(groupedItems).length === 0 && (
              <p className="carrinho-vazio">Seu carrinho está vazio.</p>
            )}

            {!loadingStores && Object.entries(groupedItems).map(([storeId, items]) => {
              const store = storeDetails[storeId];
              return (
                <div className="loja-grupo" key={storeId}>
                  <div className="loja-cabecalho">
                    <img 
                      src={store?.banner_url || Fundo} 
                      alt={store?.nome || 'Loja'} 
                      className="loja-icone"
                      draggable="false" 
                    />
                    <p className="loja-nome">{store?.nome}</p>
                    {/* <button className="tres-pontos-loja"><MoreHorizIcon /></button> */}
                  </div>
                  {items.map(item => (
                    <div className="produto-item" key={item.id}>
                      {/* <img src={item.imagem_url || Fundo} alt={item.nome} className="produto-imagem" draggable="false" /> */}
                      <div className="produto-detalhes">
                        <p className="produto-nome">{item.nome}</p>
                        <p className="produto-preco-unitario">{item.preco?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      </div>
                      <div className="produto-controles">
                        <button onClick={() => handleQuantityChange(item.id, -1)}><RemoveIcon fontSize="small"/></button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => handleQuantityChange(item.id, 1)}><AddIcon fontSize="small"/></button>
                        <button onClick={() => removeItemFromCart(item.id)} className="botao-remover-item"><DeleteIcon fontSize="small"/></button>
                      </div>
                      <p className="produto-subtotal">{(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {cartItems.length > 0 && (
            <div className="baixo">
              <p className='total-carrinho'>Total: {getCartTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
              <button 
                className='botao-finalizar-compra' 
                aria-describedby={idFinalizar} 
                onClick={abrirPopupFinalizar}
              >
                Finalizar Compra
              </button>
							
						<PopupPagamento
							idFinalizar={idFinalizar}
							openFinalizar={openFinalizar}
							popupFinalizar={popupFinalizar}
							fecharPopupFinalizar={fecharPopupFinalizar}
						/>
            </div>
          )}
        </div>
			</Typography>
		</Popover>
	);
}

export default PopupCarrinho;