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

import Fundo from '../../assets/app/fundo.jpg'

function PopupPagamento({
	fecharPopupFinalizar,
	idFinalizar,
	openFinalizar,
	popupFinalizar
}) {
	const [formaPagamento, setFormaPagamento] = useState('nenhum');
	const [valorDinheiro, setValorDinheiro] = useState(''); // Estado para o valor em dinheiro
	const [chavePix, setChavePix] = useState('');

	const dataMask = (value) => {
		if (!value) return "";
		value = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
		value = value.replace(/(\d{2})(\d)/, "$1/$2"); // Adiciona a barra após o mês
		value = value.slice(0, 5); // Limita o valor a 5 caracteres (MM/YY)
		return value;
	};

	const dinMask = (value) => {
		if (!value) return "";

		// Remove todos os caracteres não numéricos, exceto o "R$"
		value = value.replace(/[^\d,]/g, ""); // Permite apenas números e vírgula

		// Adiciona "R$" no início, se não estiver presente
		if (!value.startsWith("R$")) {
			value = "R$ " + value;
		}

		// Substitui ponto por vírgula
		value = value.replace(/\./g, ",");

		const parts = value.split(",");
    if (parts.length > 2) {
        value = parts[0] + "," + parts[1]; // Mantém apenas a primeira vírgula
    }

    // Limita as casas decimais a no máximo 2
    if (parts.length === 2 && parts[1].length > 2) {
        value = parts[0] + "," + parts[1].slice(0, 2); // Mantém apenas as duas primeiras casas decimais
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
				<div className='popup-finalizar'>
					<div className='topo'>
						<div className='botao-sair'>
							<p className='subtitulo-pagamento'>Método de pagamento</p>
							<button className='botao-fecha-pag' onClick={fecharPopupFinalizar}>
								<CloseIcon className='close-icon' />
							</button>
						</div>
						<div className='linha-englobadora-pagamento'>
						<div className='parte-esquerda'>
							<div>
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
												label={<div className='simbol-forma'><CreditCardIcon /> Cartão</div>}
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

											<h6 className='subtitle-pagamento'>Titular do cartão</h6>
											<input className='input-pagamento' type='text' placeholder='Titular do cartão' />

											<h6 className='subtitle-pagamento'>Número do cartão</h6>
											<input className='input-pagamento' type='number' placeholder='Número do cartão' onInput={(e) => {
												if (e.target.value.length > 15) {
													e.target.value = e.target.value.slice(0, 15); // Limita a 15 caracteres
												}
											}} />

											<div className='data-codigo'>

												<div>
													<h6 className='subtitle-pagamento'>Data de validade</h6>
													<input className='input-pagamento-menor'
														type='text'
														placeholder='YY/MM'
														maxLength="5"
														onChange={(e) => {
															e.target.value = dataMask(e.target.value);
														}}
													/>
												</div>

												<div>
													<h6 className='subtitle-pagamento'>Código de segurança</h6>
													<input className='input-pagamento-menor'
														type='number'
														placeholder='000'
														onInput={(e) => {
															if (e.target.value.length > 3) {
																e.target.value = e.target.value.slice(0, 3); // Limita a 3 caracteres
															}
														}} />
												</div>

											</div>

										</div>
									) : formaPagamento === 'pix' ? (
										<div className='pix'>
											<h6 className='subtitle-pagamento'>Chave pix</h6>
											<input id='chave-pix'
												className='input-pagamento'
												type='text'
												placeholder='Chave pix'
												value={chavePix}
												onChange={(e) => setChavePix(e.target.value)}
											/>
										</div>
									) : formaPagamento === 'dinheiro' ? (
										<div className='dinheiro'>
											<h6 className='subtitle-pagamento'>Valor em dinheiro</h6>
											<input
												id='dinheiro'
												className='input-pagamento'
												type='text'
												placeholder='R$0,00'
												value={valorDinheiro}
												onChange={(e) => setValorDinheiro(dinMask(e.target.value))}
											/>
										</div>
									) : (
										<div></div>
									)
								}
							</div>

							<button className='botao-continue-pag'>Continue</button>
						</div>
						<div className='parte-direita'>
							<div>
							<p className='sumario'>Sumário</p>

							<div className='container-produtos'>
								<div className='container-produto-individual'>
									<img src={Fundo} />
									<div className='informacoes-produto-pag'>
										<p className='nome-loja-pag'>Nome loja</p>
										<p className='nome-produto-pag'>Nome do produto</p>
										<p className='adicionais-produto-pag'>Adicionais: N/A</p>
										<p className='quantidade-produto-pag'>Quantidade: 3</p>
									</div>
								</div>
							</div>
							</div>
							
							<div className='container-preco-pagamento'>
								<p className='sumario-preco'>Sumário do pedido</p>
								<div className='preco-pagamento'>
									<p>Total:</p>
									<p>R$ 98,80</p>
								</div>
							</div>
						</div>
						</div>
					</div>
				</div>
			</Typography>
		</Popover>
	);
}
export default PopupPagamento;