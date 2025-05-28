import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css'; // Importando o arquivo CSS para estilização

import Voltar from '../../assets/icones/voltar.png'; // Importando o ícone de voltar
import ConfigIcone from '../../assets/icones/configurações.png'; // Importando o ícone de configuração
import Fundo from '../../assets/app/fundo.jpg'; // Importando a imagem de fundo (placeholder)

import ConteudoLoja from '../../components/telaloja/conteudoLoja.jsx'; // Importando o componente de conteúdo da loja 
import SimpleBottomNavigation from '../../components/barraNav';
import { useMediaQuery } from '@mui/material';
import { supabase } from '../../supabaseClient'; // Importar supabase

function Store() {
  const { storeId } = useParams(); // Obter o ID da loja da URL
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 720px)');

  const [storeData, setStoreData] = useState(null);
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estados para banner (mantidos caso sejam configuráveis pelo dono via DB)
  const [tipoBanner, setTipoBanner] = useState('foto-banner'); // 'foto-banner' ou 'cor-banner'
  const [corBanner, setCorBanner] = useState('#e88099'); // Cor padrão
  const [fotoBannerUrl, setFotoBannerUrl] = useState(Fundo); // Foto padrão

  useEffect(() => {
    const fetchStoreAndProducts = async () => {
      if (!storeId) {
        setError('ID da loja não encontrado.');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // 1. Buscar dados da loja
        const { data: loja, error: lojaError } = await supabase
          .from('tb_lojas')
          .select('*')
          .eq('id', storeId)
          .single();

        if (lojaError) throw lojaError;
        if (!loja) throw new Error('Loja não encontrada.');
        
        setStoreData(loja);
        // Atualizar estado do banner com dados da loja, se aplicável
        // Exemplo: setCorBanner(loja.banner_color || '#e88099');
        // Exemplo: setFotoBannerUrl(loja.banner_url || Fundo);
        // Exemplo: setTipoBanner(loja.banner_url ? 'foto-banner' : 'cor-banner');

        // 2. Buscar produtos da loja
        const { data: produtos, error: produtosError } = await supabase
          .from('tb_produto')
          .select('*')
          .eq('id_loja', storeId);

        if (produtosError) throw produtosError;

        setProductsData(produtos || []);

      } catch (err) {
        console.error("Erro ao buscar dados da loja ou produtos:", err);
        setError(`Falha ao carregar dados: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreAndProducts();
  }, [storeId]); // Re-executar quando storeId mudar

  return (
    <>
    <div className="store">
      <div id='lateral-esquerda-store' className='laterais'>
        <div className='parte-voltar'>
          <button className='botao-voltar' onClick={() => navigate('/')}>
            <img src={Voltar} className='voltar-icon' />
          </button>
        </div>
      </div>

      <div className='conteudo-store'>
          {loading && <div className="loading-message">Carregando loja...</div>}
          {error && <div className="error-message">{error}</div>}
          
          {!loading && !error && storeData && (
            <>
              {/* Banner da Loja */}
              <div 
                className={`banner-store ${tipoBanner}`}
                style={{
                  backgroundImage: tipoBanner === 'foto-banner' ? `url(${fotoBannerUrl})` : 'none',
                  backgroundColor: tipoBanner === 'cor-banner' ? corBanner : 'transparent',
                }} 
              >
                {/* Foto de Perfil da Loja */}
                <div 
                  className='foto-store-banner' 
                  style={{ backgroundImage: `url(${storeData.profile_image_url || Fundo})` }} // Usar imagem de perfil da loja ou placeholder
                ></div>
              </div>
              {/* Passar dados da loja e produtos para o componente ConteudoLoja */}
              <ConteudoLoja loja={storeData} produtos={productsData} />
            </>
          )}
        </div>

      <div id='lateral-direita-store' className='laterais'>
        <div className='parte-config'>
          <button className='botao-config' onClick={() => navigate('/store')}>
            <img src={ConfigIcone} className='voltar-icon' />
          </button>
        </div>
      </div>
    </div>
    {isMobile && <div className="bottom-navigation"><SimpleBottomNavigation /></div>}
    </>
  );
}

export default Store;