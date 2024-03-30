
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';
import Link from 'next/link';

import OpenModal from '@/components/button/OpenModal';
import ModalDeputado from '@/components/modal/ModalDeputado';
import TextSituacao from '@/components/text/TextSituacao';

import './style.scss';


type CardPessoaProps = {
    user: {
        nome: string;
        cim: string;
        loja: string;
        lojaNumero: string;
        cargo: string;
        ativo: boolean;
        situacao: string;
        situacaoData: string;
        dataNascimento?: string;
        cpf?: string;
        email?: string;
        celular?: string;
        cimSuplente?: string;
        nomeSuplente?: string;
        cargos?: {
            nome: string;
            dataNomeacao: string;
            dataTermino: string;
        }[];
    }
    admin: boolean;
}


export default function CardPessoa(props: CardPessoaProps) {
    const user = props.user;
    const fotoURL = `${API}/user/${user.cim}/picture/small`;

    const modalContent = (
        <ModalDeputado user={user} />
    );

    const modalFooterContent = (
        <div>
            {props.admin && (
                <Link href={'/edit/user/' + user.cim}>
                    <button className="btnPrimary">
                        <p>Gerenciar</p>
                    </button>
                </Link>
            )}
        </div>
    );


    return (
        <OpenModal
            tagType="button"
            className="cardPessoa"
            modalTitle="Deputado"
            modalContent={modalContent}
            modalFooterContent={modalFooterContent}
        >
            <img className="profilePicture" src={fotoURL} alt="" />
            <p id="nome">{capitalize(user.nome)}</p>
            <p id="cim">{user.cim}</p>
            <p id="loja">{capitalize(user.loja)}</p>
            <p id="lojaNumero">{user.lojaNumero}</p>
            <p id="cargo">{capitalize(user.cargo || '')}</p>
            <TextSituacao ativo={user.ativo} situacao={capitalize(user.situacao)} />
        </OpenModal>
    )
}