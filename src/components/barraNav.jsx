import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import Perfil from '../assets/icones/perfil.png';
import Config from '../assets/icones/configurações.png';
import React, { useState } from 'react';

import './styleNavBar.css'

export default function SimpleBottomNavigation() {
  const [selected, setSelected] = useState('home'); // Estado para rastrear o ícone selecionado

  return (
    <div className="navBar">
      <button
        className={`iconeNavBar ${selected === 'home' ? 'active' : ''}`}
        onClick={() => setSelected('home')}
      >
        <HomeIcon />
      </button>
      <button
        className={`iconeNavBar ${selected === 'pesquisa' ? 'active' : ''}`}
        onClick={() => setSelected('pesquisa')}
      >
        <SearchIcon />
      </button>
      <button
        className={`iconeNavBar ${selected === 'perfil' ? 'active' : ''}`}
        onClick={() => setSelected('perfil')}
      >
        <img src={Perfil} className='iconeNav'/>
      </button>
      <button
        className={`iconeNavBar ${selected === 'config' ? 'active' : ''}`}
        onClick={() => setSelected('config')}
      >
        <img src={Config} className='iconeNav'/>
      </button>
    </div>
  );
}