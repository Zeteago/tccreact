import React, { useRef, useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Food from '../../assets/icones/food.png';
import Commerce from '../../assets/icones/commerce.png';
import './style.css';
import Button from '@mui/material/Button';

import AbaEsquerda from '../../components/abas/abaEsquerda';
import AbaDireita from '../../components/abas/abaDireita';
import ConteudoPrincipal from '../../components/conteudoPrincipal';
import SimpleBottomNavigation from '../../components/barraNav';

import { useLocation } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
import { supabase } from '../../supabaseClient'; // Importar supabase

function Home() {
  const location = useLocation();
  const message = location.state?.message;
  const [pesquisaAtiva, setPesquisaAtiva] = useState(false);
  const [termoBusca, setTermoBusca] = useState('');
  const isMobile = useMediaQuery('(max-width: 720px)');
  const [botaoTipo, setBotaoTipo] = useState('food'); // 'food', 'commerce', ou 'ambos' para busca
  const [dadosLojas, setDadosLojas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputBuscaRef = useRef(null);
  // const { user } = useAuth(); // Descomentar se precisar do user ID para RLS

  // Função para buscar lojas no Supabase
  const fetchLojas = async (tipo, busca) => {
    setLoading(true);
    setError(null);
    setDadosLojas([]); // Limpa dados anteriores

    try {
      let query = supabase.from('tb_lojas').select('*');

      // Filtrar por tipo (food/commerce) se não for busca geral
      if (tipo === 'food') {
        query = query.eq('tipo', true); // Assumindo true = food, false = commerce (ajustar conforme schema real)
      } else if (tipo === 'commerce') {
        query = query.eq('tipo', false);
      }

      // Filtrar por termo de busca se houver
      if (busca && busca.trim() !== '') {
        // Busca no nome da loja OU na descrição OU categorias (ajustar colunas conforme necessário)
        query = query.or(`nome.ilike.%${busca}%,descricao.ilike.%${busca}%,categorias.ilike.%${busca}%`);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }
      setDadosLojas(data || []);
    } catch (err) {
      console.error("Erro ao buscar lojas:", err);
      setError('Falha ao carregar lojas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  // Efeito para buscar dados quando o tipo ou termo de busca muda
  useEffect(() => {
    if (pesquisaAtiva) {
        fetchLojas('ambos', termoBusca);
    } else {
        fetchLojas(botaoTipo, ''); // Busca por tipo selecionado sem termo
    }
  }, [botaoTipo, pesquisaAtiva, termoBusca]);

  function btMudaTipo(event) {
    const name = event.currentTarget.dataset.name;
    setPesquisaAtiva(false); // Desativa a busca ao trocar tipo
    setTermoBusca(''); // Limpa termo de busca
    if (inputBuscaRef.current) inputBuscaRef.current.value = ''; // Limpa input visualmente
    setBotaoTipo(name);
  }

  function ativaBusca() {
    const buscaAtual = inputBuscaRef.current?.value || '';
    setTermoBusca(buscaAtual);
    setPesquisaAtiva(true);
    setBotaoTipo('ambos'); // Indica que a busca é geral
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      ativaBusca();
    }
  };

  return (
    <>
      <div className='Tudo'>
        <div className='menu-esquerdo'>
          <AbaEsquerda /> {/* TODO: Passar lojas seguidas? */}
        </div>
        <div className='conteudo'>
          <div className='hotbar'>
            <div className='botoes'>
              <Button 
                data-name='food' 
                className='button' 
                variant={botaoTipo === 'food' && !pesquisaAtiva ? "contained" : "outlined"} 
                onClick={btMudaTipo}
              >
                <img className='foodImg' src={Food} draggable='false' alt="Food"/>
                Food
              </Button>
              <Button 
                data-name='commerce' 
                className='button' 
                variant={botaoTipo === 'commerce' && !pesquisaAtiva ? "contained" : "outlined"} 
                onClick={btMudaTipo}
              >
                <img className='foodImg' src={Commerce} draggable='false' alt="Commerce"/>
                Commerce
              </Button>
            </div>
            {
              !isMobile && (
                <div className='input-container'>
                  <div className='button-input'>
                    <button className='menu'>
                      <MenuIcon className="menu-icon" />
                    </button>
                    <input
                      placeholder="Buscar em AYVU"
                      name='caixaPesquisa'
                      type='text'
                      ref={inputBuscaRef}
                      onKeyDown={handleKeyDown}
                      defaultValue={termoBusca} // Controla o valor inicial
                    />
                  </div>
                  <button className='search' onClick={ativaBusca}>
                    <SearchIcon className="search-icon" />
                  </button>
                </div>
              )
            }
          </div>
          
          {/* Passar dados, loading e error para ConteudoPrincipal */}
          <ConteudoPrincipal 
            lojas={dadosLojas} 
            loading={loading} 
            error={error} 
            tipo={pesquisaAtiva ? 'busca' : botaoTipo} // Informa o contexto da exibição
          />

        </div>
        <div className='menu-direito'>
          <AbaDireita /> {/* TODO: Passar dados do usuário, carrinho? */}
        </div>
      </div>
      {isMobile && <div className="bottom-navigation"><SimpleBottomNavigation /></div>}
    </>
  );
}

export default Home;

