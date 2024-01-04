import React, { useState } from 'react'
import Link from 'next/link'

import './style.scss'

type CardPostAcaoProps = {
    id: number; // o id é enviado na request pro bd ao clicar no card 
    ativo: boolean;
    tipo: string;
    titulo: string;
    dataDeAtualizacao: Date;
    statusAtual: number;
    statusFinal?: string;
    autor: {
        nome: string;
        fotoURL: string;
    }
    showDetalhes?: boolean;
}

export default function CardPostAcao({ showDetalhes = true, ...props }: CardPostAcaoProps) {
	const [postTipo] = useState(props.tipo)

	/* Filtro do stuatus atual para Proposta e Emenda (ignorar os 2 primeiros no card e o ultimo) */
	const statusAtualFiltrado =
        postTipo === 'Proposta' || postTipo === 'Emenda' ? (props.statusAtual - 2) : props.statusAtual


	/* Detalhes do status de cada tipo de post (Proposta, Emenda, Licença e Renúncia) */
	const statusPostProposta = [
		//{ responsavelPelaAcao: "Ação do Autor", descricaoDoStatus: "Pendente com o autor" },
		//{ responsavelPelaAcao: "Ação do Presidente", descricaoDoStatus: "Pendente em redação" },
		{ responsavelPelaAcao: 'Ação de Demais Deputados', descricaoDoStatus: 'Obtendo assinaturas' },
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Aguardando encaminhamento para comissão' },
		{ responsavelPelaAcao: 'Ação da Comissão', descricaoDoStatus: 'Encaminhado para comissão' },
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Aguardando encaminhamento para plenário' },
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Pendente em plenário para votação' },
		//{ responsavelPelaAcao: "Ação Concluída", descricaoDoStatus: "Votação concluída" },
	]

	const statusPostEmenda = [
		//{ responsavelPelaAcao: "Ação do Autor", descricaoDoStatus: "Pendente com o autor" },
		//{ responsavelPelaAcao: "Ação do Presidente", descricaoDoStatus: "Pendente em redação" },
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Aguardando encaminhamento para comissão' },
		{ responsavelPelaAcao: 'Ação da Comissão', descricaoDoStatus: 'Encaminhado para comissão' },
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Aguardando encaminhamento para plenário' },
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Pendente em plenário para votação' },
		//{ responsavelPelaAcao: "Ação Concluída", descricaoDoStatus: "Votação concluída" },
	]

	const statusPostOutro = [
		{ responsavelPelaAcao: 'Ação do Presidente', descricaoDoStatus: 'Aguardando deferimento' },
		{ responsavelPelaAcao: 'Ação Concluída', descricaoDoStatus: 'Concluído' }
	]


	/* Quantos status tem? (Cada tipo tem quantidades diferentes) */
	const statusDoPost =
        postTipo === 'Proposta' ? statusPostProposta :
        	postTipo === 'Emenda' ? statusPostEmenda :
        		statusPostOutro


	/* Filtro do titulo do tipo do post para o uso de acentos */
	const postTipoTitulo =
        postTipo === 'Proposta' ? 'Proposta' :
        	postTipo === 'Emenda' ? 'Emenda' :
        		postTipo === 'Licenca' ? 'Licença' :
        			postTipo === 'Renuncia' ? 'Renúncia' :
        				'Ação'

	const statusAtual = statusDoPost[statusAtualFiltrado] || {}
	const dataDeAtualizacao = props.dataDeAtualizacao.toLocaleDateString()

	return (
		<Link href="/dashboard/acao">
			<button className={`cardPostAcao postTipo${props.tipo} postAcao${props.statusFinal}`}>
				<h1 id="tipo">{postTipoTitulo}</h1>

				{props.ativo ?
					showDetalhes ? (<p id="responsavelPelaAcao">{statusAtual.responsavelPelaAcao}</p>)
						: null
					: (<p id="responsavelPelaAcao">{`Ação ${props.statusFinal}`}</p>)
				}

				<h2 id="titulo">{props.titulo}</h2>

				{showDetalhes && (
					<>
						<div id="statusProgresso">
							{statusDoPost.map((status, index) => (
								<div
									key={index}
									id={`progresso-${index}`}
									className={index <= statusAtualFiltrado ? 'aprovado' : ''}
								/>
							))}
						</div>
						<p id="descricaoDoStatus">{statusAtual.descricaoDoStatus}</p>
					</>
				)}

				<div id="postAutor">
					<img id="fotoURL" src={props.autor.fotoURL} alt="" />
					<p id="autor">Por: <b>{props.autor.nome}</b></p>
					<p id="dataDeAtualizacao">Atualizado: <b>{dataDeAtualizacao}</b></p>
				</div>
			</button>
		</Link>
	)
}