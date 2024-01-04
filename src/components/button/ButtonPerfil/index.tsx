import React from 'react'
import OpenModal from '@/components/button/OpenModal'
import ModalDeputado from '@/components/modal/ModalDeputado'

import './style.scss'

type ButtonPerfilProps = {
    nome: string;
    cim: number;
    loja: string;
    lojaNumero: number;
    cargo: string;
    situacao: boolean;
    fotoURL: string;
};

export default function ButtonPerfil(props: ButtonPerfilProps) {
	const modalContent = (
		<ModalDeputado
			nome={props.nome}
			cim={props.cim}
			loja={props.loja}
			lojaNumero={props.lojaNumero}
			cargo={props.cargo}
			situacao={props.situacao}
			fotoURL={props.fotoURL}
		/>
	)

	const modalFooterContent = (
		<div>
			<button className="btnPrimary">
				<p>Editar</p>
			</button>
		</div>
	)

	const [primeiroNome, segundoNome] = props.nome.split(' ')
	const cargo = props.cargo.length > 15 ? `${props.cargo.substring(0, 15)}...` : props.cargo

	return (
		<OpenModal
			tagType="button"
			className="buttonPerfil"
			modalTitle="Deputado"
			modalContent={modalContent}
			modalFooterContent={modalFooterContent}
		>
			<img src={props.fotoURL} alt="" />

			<div className="perfilDados">
				<h1>{`${primeiroNome} ${segundoNome}`}</h1>
				<p>
					{props.cim} • {cargo}
				</p>
			</div>
		</OpenModal>
	)
}
