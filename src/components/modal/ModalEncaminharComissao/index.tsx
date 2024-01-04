import React from 'react'
import './style.scss'


// Banco de dados temporario (request: listar comissões + cim do presidente)
const dbComissoes = {
	nome: '',
	comissaoID: 2353,
	/* Só o presidente da comissão terá o acesso para deferir/in 
    (se o usuario logado estiver na comissão de mesmo id e for presidente...)*/
}

export default function ModalEncaminharComissao() {
	return (
		<div className="modalEncaminhar">
			<h1>Encaminhar para...</h1>

			<div>
				<p><input type="radio" name="opcao" id="opcao1" />Teste 1</p>
				<p><input type="radio" name="opcao" id="opcao2" />Teste 2</p>
				<p><input type="radio" name="opcao" id="opcao3" />Teste 3</p>
				<p><input type="radio" name="opcao" id="opcao4" />Teste 4</p>
				<p><input type="radio" name="opcao" id="opcao5" />Teste 5</p>
				<p><input type="radio" name="opcao" id="opcao6" />Teste 6</p>
				<p><input type="radio" name="opcao" id="opcao7" />Teste 7</p>
				<p><input type="radio" name="opcao" id="opcao8" />Teste 8</p>
				<p><input type="radio" name="opcao" id="opcao9" />Teste 9</p>
			</div>
		</div>
	)
}
