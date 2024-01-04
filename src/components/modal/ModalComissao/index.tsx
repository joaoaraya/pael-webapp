import React from 'react'
import './style.scss'

type ComissaoProps = {
    nome: string;
    participantes: {
        nome: string;
        presidente: boolean;
        fotoURL: string;
    }[];
};

export default function ModalComissao(props: ComissaoProps) {
	return (
		<div className="modalComissao">
			<h1>{props.nome}</h1>

			<div className="grupo">
				<h2>Presidente</h2>
				{props.participantes.map((membro, index) => (
					membro.presidente && (
						<div className="membro" key={index}>
							<img src={membro.fotoURL} alt="" />
							<p>{membro.nome}</p>
						</div>
					)
				))}
			</div>

			<div className="grupo">
				<h2>Membros</h2>
				{props.participantes.map((membro, index) => (
					!membro.presidente && (
						<div className="membro" key={index}>
							<img src={membro.fotoURL} alt="" />
							<p>{membro.nome}</p>
						</div>
					)
				))}
			</div>
		</div>
	)
}