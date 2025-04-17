import { useRef } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Food from '../../assets/icones/food.png'
import Commerce from '../../assets/icones/commerce.png'
import './style.css'

function Home() {

  const inputBusca = useRef(null)

  function ativaBusca() {
    if (inputBusca.current) {
      inputBusca.current.focus()
    }
  }

    return (
      <>
      <div className='Tudo'>

      <div className='menu-esquerdo'>ola</div>
      <div className='conteudo'>
        <div className='hotbar'>
          <div className='botoes'>
            <button>
              <img className='foodImg' src={Food} draggable='false'/>
              Food
            </button>
            <button>
            <img className='foodImg' src={Commerce} draggable='false'/>
              Commerce
            </button>
          </div>
          <div className='input-container'>
            <div className='button-input'>
              <button className='menu'>
                <MenuIcon className="menu-icon" />
              </button>
              <input placeholder="Buscar" name='caixaPesquisa' type='text' ref={inputBusca}/>
            </div>
            <button className='search' onClick={ativaBusca}>
              <SearchIcon className="search-icon" />
            </button>
          </div>
        </div>
      </div>
      <div className='menu-direito'>ola</div>

      </div>
      </>      
    )
  }
  
  export default Home