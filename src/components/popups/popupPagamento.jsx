import './pagamentoStyle.css';
import React, { useState } from 'react';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import PixIcon from '@mui/icons-material/Pix';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

function PopupPagamento({
	fecharPopupFinalizar,
	idFinalizar,
	openFinalizar,
	popupFinalizar
}) {
	const [formaPagamento, setFormaPagamento] = useState('nenhum');

	return (
		<Popover
			id={idFinalizar}
			open={openFinalizar}
			anchorEl={popupFinalizar}
			onClose={fecharPopupFinalizar}
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
				<div className='popup-finalizar'>
					<div className='topo'>
						<div className='botao-sair'>
							<p className='subtitulo-pagamento'>Método de pagamento</p>
							<button onClick={fecharPopupFinalizar}>
								<CloseIcon className='close-icon' />
							</button>
						</div>
						<div className='escolha-pagamento'>
							<FormControl className='form-control-forma'>
								<FormLabel
									id="demo-row-radio-buttons-group-label"
									sx={{
										color: 'grey',
										fontSize: '18px',
										'&.Mui-focused': { color: '#E88099' },
									}}
								>
									Forma
								</FormLabel>
								<RadioGroup
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
									className='radio-group'
								>
									<FormControlLabel
										value="cartao"
										control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />}
										label={<div className='simbol-forma'><CreditCardIcon />Cartão</div>}
										onClick={() => setFormaPagamento('cartao')}
									/>
									<FormControlLabel
										value="pix"
										control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />}
										label={<div className='simbol-forma'><PixIcon /> Pix</div>}
										onClick={() => setFormaPagamento('pix')}
									/>
									<FormControlLabel
										value="dinheiro"
										control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />}
										label={<div className='simbol-forma'><LocalAtmIcon /> Dinheiro</div>}
										onClick={() => setFormaPagamento('dinheiro')}
									/>
								</RadioGroup>
							</FormControl>
						</div>
						{
							formaPagamento === 'cartao' ? (
								<div className='cartao'>
									<div className='escolha-pagamento'>
										<FormControl className='form-control-forma'>
											<FormLabel
												id="demo-row-radio-buttons-group-label"
												sx={{
													color: 'grey',
													fontSize: '18px',
													'&.Mui-focused': { color: '#E88099' },
												}}
											>
												Tipo
											</FormLabel>
											<RadioGroup
												row
												aria-labelledby="demo-row-radio-buttons-group-label"
												name="row-radio-buttons-group"
												className='radio-group2'
											>
												<FormControlLabel
													value="credito"
													control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />}
													label={<div className='simbol-forma'><CreditCardIcon /> Crédito</div>}
												/>
												<FormControlLabel
													value="debito"
													control={<Radio sx={{ color: 'grey', '&.Mui-checked': { color: '#E88099' } }} />}
													label={<div className='simbol-forma'><CreditCardIcon /> Débito</div>}
												/>
											</RadioGroup>
										</FormControl>
									</div>
									<h6>Nome do cartão</h6>
									<input type='text' placeholder='Nome do cartão' />
									<h6>Número do cartão</h6>
									<input type='number' placeholder='Número do cartão' maxLength="15" />
									<h6>Data de validade</h6>
									<input type='text' placeholder='Data de validade' />
									<h6>Código de segurança</h6>
									<input type='number' placeholder='Código de segurança' maxLength="3" />
								</div>
							) : formaPagamento === 'pix' ? (
								<div className='pix'>
									<p>Pix</p>
									<h6>Chave pix</h6>
									<input type='text' placeholder='Chave pix' />
								</div>
							) : formaPagamento === 'dinheiro' ? (
								<div className='dinheiro'>
									<p>Dinheiro</p>
									<h6>Valor em dinheiro</h6>
									<input type='number' placeholder='Valor em dinheiro' />
								</div>
							) : (
								<div></div>
							)
						}
					</div>
				</div>
			</Typography>
		</Popover>
	);
}
export default PopupPagamento;