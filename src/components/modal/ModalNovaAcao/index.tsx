'use-strict'
import Link from 'next/link'
import './style.scss'

export default function ModalNovaAcao() {
	const acoes = [
		{ titulo: 'Emenda Constitucional' },
		{ titulo: 'Projeto de Lei' },
		{ titulo: 'Projeto de Resolução' },
		{ titulo: 'Moção' },
		{ titulo: 'Indicação' },
		{ titulo: 'Requerimento' },
		{ titulo: 'Representação' },
		{ titulo: 'Substantivo' },
		{ titulo: 'Decreto Legislativo' },
		{ titulo: 'Homologação' },
		{ titulo: 'Emenda a Projeto' },
		{ titulo: 'Pedido de Licença' },
		{ titulo: 'Pedido de Renúncia' }
	]

	return (
		<div className="modalNovaAcao">
			{acoes.map((acao: any, index) => (
				<>
					<button key={index} >
						<Link href='/dashboard/actions/create'>
							<p>{acao.titulo}</p>
						</Link>
					</button>
				</>
			))}
		</div>
	)
}