import OpenModal from '../OpenModal'
import ModalDeputado from '@/components/modal/ModalDeputado'

import './style.scss'

type ButtonPessoaProps = {
    nome: string;
    cim: number;
    loja: string;
    lojaNumero: number;
    cargo: string;
    situacao: boolean;
    fotoURL: string;
}

export default function ButtonPessoa(props: ButtonPessoaProps) {
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

	return (
		<OpenModal
			tagType="button"
			className="buttonPessoa"
			modalTitle="Deputado"
			modalContent={modalContent}
		>
			<img src={props.fotoURL} alt="" />
			<p>{props.nome}</p>
		</OpenModal>
	)
}
