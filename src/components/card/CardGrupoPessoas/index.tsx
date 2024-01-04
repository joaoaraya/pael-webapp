import OpenModal from '@/components/button/OpenModal'
import ModalComissao from '@/components/modal/ModalComissao'

import './style.scss'

type CardGrupoPessoasProps = {
    id: number;
    nome: string;
    participantes: {
        nome: string;
        fotoURL: string;
        presidente: boolean;
    }[];
};

export default function CardGrupoPessoas(props: CardGrupoPessoasProps) {

	const listaParticipantes = (props: CardGrupoPessoasProps) => {
		// Separação do presidente e demais participantes
		const membroPresidente = props.participantes.filter((membro) => membro.presidente)
		const membros = props.participantes.filter((membro) => !membro.presidente)

		// Ordenar em ordem alfabética
		membroPresidente.sort((a, b) => a.nome.localeCompare(b.nome))
		membros.sort((a, b) => a.nome.localeCompare(b.nome))

		// Juntar todos os membros e deixar presidente em primeiro lugar
		return [...membroPresidente, ...membros]
	}

	const maxPessoasFoto = 3

	const imgParticipantes = (
		<>
			{listaParticipantes(props).slice(0, maxPessoasFoto).map((participante, index) => (
				<img
					key={index}
					id={`imgID${index}`}
					src={participante.fotoURL}
					alt=""
				/>
			))}
		</>
	)

	const modalContent = (
		<ModalComissao
			nome={props.nome}
			participantes={listaParticipantes(props)}
		/>
	)

	const modalFooterContent = (
		<div>
			<a href={`/editComissao&ID=${props.id}`}>
				<button className="btnPrimary">
					<p>Editar</p>
				</button>
			</a>
		</div>
	)

	return (
		<OpenModal
			tagType="button"
			className="cardGrupoPessoas"
			modalTitle="Comissão"
			modalContent={modalContent}
			modalFooterContent={modalFooterContent}
		>
			<h1 id="nomeComissao">{props.nome}</h1>

			<div id="participantes">
				{imgParticipantes}
				<div id="imgVazio" />
				<p>
					{listaParticipantes(props)[0].nome.split(' ')[0]}
                    &nbsp;e +{listaParticipantes(props).length}...
				</p>
			</div>
		</OpenModal>
	)
}
