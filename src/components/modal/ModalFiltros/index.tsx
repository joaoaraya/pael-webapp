import './style.scss'

export default function ModalFiltros() {
	const filtros = [
		{
			grupo: 'Ordenar por:',
			opcoes: [
				{ titulo: 'Nome', selecionado: true },
				{ titulo: 'CIM', selecionado: false },
				{ titulo: 'Loja', selecionado: false },
				{ titulo: 'Nº loja', selecionado: false },
				{ titulo: 'Cargo', selecionado: false },
				{ titulo: 'Situação', selecionado: false }
			]
		}, {
			grupo: 'Exibir:',
			opcoes: [
				{ titulo: 'Todos', selecionado: true },
				{ titulo: 'Ativos', selecionado: false },
				{ titulo: 'Inativos', selecionado: false },
				{ titulo: 'Com Cargos', selecionado: false },
				{ titulo: 'Sem Cargos', selecionado: false }
			]
		}
	]

	return (
		<div className="modalFiltros">
			{filtros.map((filtro) => (
				<div className="filtrosGrupo">
					<h1>{filtro.grupo}</h1>
					{filtro.opcoes.map((opcao, index) => (
						<button
							key={index}
							className={opcao.selecionado ? 'selecionado' : ''}
						>
							<p>{opcao.titulo}</p>
						</button>
					))}
				</div>
			))}
		</div>
	)
}