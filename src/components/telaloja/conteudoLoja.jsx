import './styleConteudoLoja.css';

import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  0.5: 'Péssimo',
  1: 'Péssimo+',
  1.5: 'Ruim',
  2: 'Ruim+',
  2.5: 'Razoável',
  3: 'Razoável+',
  3.5: 'Bom',
  4: 'Bom+',
  4.5: 'Excelente',
  5: 'Excelente+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

function ConteudoLoja() {
  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  return (
    <div className="td-conteudo-loja">
      <div className='parte-esquerda-loja'>
        <p className='nome-loja'>Loja Tal</p>
        <p className='categoria-loja'>Marmitas e Sucos</p>
        <p className='seguidores'>999</p>
      </div>
      <div className='parte-descricao-loja'>
        <p className='descricao-loja'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto accusantium sunt iste quibusdam provident hic consequatur, nam rerum enim perferendis quo vel, molestias vero voluptate eligendi possimus nemo tenetur nisi!
        </p>
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
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
          />
          {value !== null && (
            <Box sx={{ ml: 2, margin: 0}}>{labels[hover !== -1 ? hover : value]}</Box>
          )}
        </Box>
        </div>
        <p className='quantidade-avaliacao'>999 avaliações</p>
      </div>
    </div>
  );
}

export default ConteudoLoja;