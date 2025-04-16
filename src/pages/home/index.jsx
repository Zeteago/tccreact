import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Food from '../../assets/icones/food.png'
import Commerce from '../../assets/icones/commerce.png'
import './style.css'

function Home() {

    return (
      <>
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
            <span>
              <button>
                <MenuIcon className="menu-icon" />
              </button>
            </span>
            <input placeholder="Buscar" name='caixaPesquisa' type='text'></input>
            <span>
              <SearchIcon className="search-icon" />
            </span>
          </div>
        </div>
      </>      
    )
  }
  
  export default Home