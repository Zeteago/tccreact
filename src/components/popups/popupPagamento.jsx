import './pagamentoStyle.css';
import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/Pix';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Fundo from '../../assets/app/fundo.jpg'; // Placeholder
import { useCart } from '../../CartContext'; // Import useCart
import { useAuth } from '../../AuthContext'; // Import useAuth to get user ID
import { supabase } from '../../supabaseClient'; // Import supabase to call RPC
import { useNavigate } from 'react-router-dom';

// Helper function to group items by store ID (can be moved to a utils file)
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

function PopupPagamento({
  fecharPopupFinalizar,
  idFinalizar,
  openFinalizar,
  popupFinalizar
}) {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formaPagamento, setFormaPagamento] = useState('cartao'); // Default to cartão
  const [tipoCartao, setTipoCartao] = useState('credito');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // State for payment details (placeholders - NOT SECURE FOR REAL USE)
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [cashValue, setCashValue] = useState('');

  // Fetch store details for summary (similar to cart popup)
  const [groupedItems, setGroupedItems] = useState({});
  const [storeDetails, setStoreDetails] = useState({});
  const [loadingStores, setLoadingStores] = useState(false);

  useEffect(() => {
    if (!openFinalizar) {
        // Reset state when popup closes
        setError(null);
        setSuccess(null);
        setLoading(false);
        return;
    }

    const grouped = groupItemsByStore(cartItems);
    setGroupedItems(grouped);
    const storeIds = Object.keys(grouped);

    if (storeIds.length > 0) {
      setLoadingStores(true);
      const fetchDetails = async () => {
        try {
          const { data, error: storeError } = await supabase
            .from('tb_lojas')
            .select('id, nome') // Only fetch needed details
            .in('id', storeIds);
          
          if (storeError) throw storeError;

          const detailsMap = data.reduce((acc, store) => {
            acc[store.id] = store;
            return acc;
          }, {});
          setStoreDetails(detailsMap);
        } catch (err) {
          console.error("Erro ao buscar detalhes das lojas para pagamento:", err);
        } finally {
          setLoadingStores(false);
        }
      };
      fetchDetails();
    } else {
      setStoreDetails({});
    }
  }, [cartItems, openFinalizar]);

  const handleCheckout = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user) {
      setError("Usuário não autenticado.");
      return;
    }
    if (cartItems.length === 0) {
      setError("Carrinho vazio.");
      return;
    }

    setLoading(true);

    // **ALERTA DE SEGURANÇA:** 
    // A coleta de dados de cartão aqui é INSEGURA e viola PCI DSS.
    // Para um projeto real, use um gateway de pagamento (Stripe, Mercado Pago, etc.)
    // que tokeniza os dados. NÃO armazene CVV.
    // A lógica abaixo SIMULA o processo, mas o foco é a criação da ordem no Supabase.

    // 1. Preparar dados para a função RPC
    const orderItems = cartItems.map(item => ({
      product_id: item.id,
      store_id: item.id_loja,
      quantity: item.quantity,
      subtotal: item.preco * item.quantity
    }));

    const orderPayload = {
      p_client_id: user.id,
      p_total: getCartTotal(),
      p_status: 'Pendente', // Ou 'Pago' se a simulação for bem-sucedida
      p_payment_method: formaPagamento,
      p_items: orderItems
    };

    try {
      // 2. Chamar a função RPC/Edge Function 'process_order'
      // Esta função DEVE existir no seu backend Supabase e ser transacional.
      const { data, error: rpcError } = await supabase.rpc('process_order', orderPayload);

      if (rpcError) {
        // Tentar extrair uma mensagem de erro mais útil da função
        const message = rpcError.details || rpcError.message;
        if (message.includes('estoque_insuficiente')) {
            throw new Error('Desculpe, um ou mais itens ficaram sem estoque.');
        } else if (message.includes('produto_nao_encontrado')) {
            throw new Error('Desculpe, um ou mais itens não estão mais disponíveis.');
        }
        throw new Error(`Erro ao processar pedido: ${message}`);
      }

      // 3. Sucesso!
      setSuccess('Pedido realizado com sucesso!');
      clearCart(); // Limpar carrinho local
      
      // Fechar popup após um delay e talvez navegar
      setTimeout(() => {
        fecharPopupFinalizar();
        // navigate('/meus-pedidos'); // Navegar para página de pedidos
      }, 2000);

    } catch (err) {
      console.error("Erro no checkout:", err);
      setError(err.message || "Ocorreu um erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  // Funções de máscara (mantidas do original, mas não usadas para envio real)
  const dataMask = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, "");
    value = value.replace(/(\d{2})(\d)/, "$1/$2");
    value = value.slice(0, 5);
    return value;
  };
  const dinMask = (value) => {
    if (!value) return "";
    value = value.replace(/[^\d,]/g, "");
    if (!value.startsWith("R$ ")) {
      value = "R$ " + value.replace(/^R\$\s*/, '');
    }
    value = value.replace(/\./g, ",");
    const parts = value.split(",");
    if (parts.length > 2) {
      value = parts[0] + "," + parts.slice(1).join('');
    }
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + "," + parts[1].slice(0, 2);
    }
    return value;
  };

	return (
		<Popover
			id={idFinalizar}
			open={openFinalizar}
			anchorEl={popupFinalizar}
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
				<form className='popup-finalizar' onSubmit={handleCheckout}>
          <div className='topo'>
            <div className='botao-sair'>
              <p className='subtitulo-pagamento'>Finalizar Compra</p>
              <button type="button" className='botao-fecha-pag' onClick={fecharPopupFinalizar} disabled={loading}>
                <CloseIcon className='close-icon' />
              </button>
            </div>
          </div>

          <div className='linha-englobadora-pagamento'>
            {/* Parte Esquerda: Método de Pagamento */}
            <div className='parte-esquerda'>
              <FormControl component="fieldset" className='form-control-forma' fullWidth>
                <FormLabel component="legend" sx={{ color: 'grey', fontSize: '18px', '&.Mui-focused': { color: '#E88099' } }}>Método de Pagamento</FormLabel>
                <RadioGroup row name="formaPagamento" value={formaPagamento} onChange={(e) => setFormaPagamento(e.target.value)} className='radio-group'>
                  <FormControlLabel value="cartao" control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} label={<div className='simbol-forma'><CreditCardIcon /> Cartão</div>} />
                  <FormControlLabel value="pix" control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} label={<div className='simbol-forma'><PixIcon /> Pix</div>} />
                  <FormControlLabel value="dinheiro" control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} label={<div className='simbol-forma'><LocalAtmIcon /> Dinheiro</div>} />
                </RadioGroup>
              </FormControl>

              {/* Campos específicos do método */} 
              {formaPagamento === 'cartao' && (
                <div className='cartao'>
                  <p style={{color: 'red', fontWeight: 'bold', margin: '10px 0'}}>ALERTA: Não insira dados reais de cartão. Use um gateway de pagamento seguro em produção.</p>
                  <FormControl component="fieldset" className='form-control-forma' fullWidth>
                      <FormLabel component="legend" sx={{ color: 'grey', fontSize: '16px', '&.Mui-focused': { color: '#E88099' } }}>Tipo</FormLabel>
                      <RadioGroup row name="tipoCartao" value={tipoCartao} onChange={(e) => setTipoCartao(e.target.value)} className='radio-group2'>
                          <FormControlLabel value="credito" control={<Radio size="small" sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} label="Crédito" />
                          <FormControlLabel value="debito" control={<Radio size="small" sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />} label="Débito" />
                      </RadioGroup>
                  </FormControl>
                  <h6 className='subtitle-pagamento'>Titular do cartão</h6>
                  <input className='input-pagamento' type='text' placeholder='Nome como no cartão' value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
                  <h6 className='subtitle-pagamento'>Número do cartão</h6>
                  <input className='input-pagamento' type='text' inputMode='numeric' placeholder='0000 0000 0000 0000' value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))} />
                  <div className='data-codigo'>
                    <div>
                      <h6 className='subtitle-pagamento'>Validade</h6>
                      <input className='input-pagamento-menor' type='text' placeholder='MM/AA' value={cardExpiry} onChange={(e) => setCardExpiry(dataMask(e.target.value))} />
                    </div>
                    <div>
                      <h6 className='subtitle-pagamento'>CVV</h6>
                      <input className='input-pagamento-menor' type='text' inputMode='numeric' placeholder='000' value={cardCvv} onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 3))} />
                    </div>
                  </div>
                </div>
              )}
              {formaPagamento === 'pix' && (
                <div className='pix'>
                  <h6 className='subtitle-pagamento'>Chave PIX (Simulação)</h6>
                  <input className='input-pagamento' type='text' placeholder='Insira a chave PIX' value={pixKey} onChange={(e) => setPixKey(e.target.value)} />
                  <p style={{fontSize: '0.8em', color: 'grey', marginTop: '5px'}}>Em um sistema real, um QR Code ou "Copia e Cola" seria gerado aqui.</p>
                </div>
              )}
              {formaPagamento === 'dinheiro' && (
                <div className='dinheiro'>
                  <h6 className='subtitle-pagamento'>Valor em dinheiro para troco (Opcional)</h6>
                  <input className='input-pagamento' type='text' placeholder='R$ 0,00' value={cashValue} onChange={(e) => setCashValue(dinMask(e.target.value))} />
                   <p style={{fontSize: '0.8em', color: 'grey', marginTop: '5px'}}>Informe se precisar de troco para pagamento na entrega/retirada.</p>
                </div>
              )}
              
              {/* TODO: Adicionar seleção de Endereço de Entrega / Opção de Retirada */} 
              <h6 className='subtitle-pagamento' style={{marginTop: '20px'}}>Entrega / Retirada</h6>
              <p style={{fontSize: '0.8em', color: 'grey'}}>Funcionalidade de seleção de endereço/retirada não implementada.</p>

            </div>

            {/* Parte Direita: Sumário do Pedido */}
            <div className='parte-direita'>
              <p className='sumario'>Sumário do Pedido</p>
              <div className='container-produtos-pag'>
                {loadingStores && <p>Carregando...</p>}
                {!loadingStores && Object.entries(groupedItems).map(([storeId, items]) => {
                  const store = storeDetails[storeId];
                  return (
                    <div key={storeId} className='sumario-loja-grupo'>
                      <p className='sumario-nome-loja'>{store?.nome || `Loja ID: ${storeId}`}</p>
                      {items.map(item => (
                        <div key={item.id} className='sumario-produto-item'>
                          <span className='sumario-produto-qtd'>{item.quantidade}x </span>
                          <span className='sumario-produto-nome'> {item.nome} </span>
                          <span className='sumario-produto-preco'>{(item.preco * item.quantidade).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
              <div className='container-preco-pagamento'>
                <div className='preco-pagamento'>
                  <p>Total:</p>
                  <p>{getCartTotal().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                </div>
              </div>
              
              {error && <p className='mensagem-erro-pagamento'>{error}</p>}
              {success && <p className='mensagem-sucesso-pagamento'>{success}</p>}

              <button type="submit" className='botao-continue-pag' disabled={loading || success || cartItems.length === 0}>
                {loading ? 'Processando...' : (success ? 'Pedido Realizado!' : 'Confirmar Pedido')}
              </button>
            </div>
          </div>
        </form>
			</Typography>
		</Popover>
	);
}
export default PopupPagamento;