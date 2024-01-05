import { useEffect, useState } from 'react';
import OpenModal from '@/components/button/OpenModal';
import ModalDeputado from '@/components/modal/ModalDeputado';
import TextSituacao from '@/components/text/TextSituacao';
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';
import './style.scss';

type CardPessoaProps = {
    user: {
        nome: string;
        cim: number;
        loja: string;
        lojaNumero: number;
        cargo: string;
        ativo: boolean;
        situacao: string;
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
}

export default function CardPessoa(props: CardPessoaProps) {
    const user = props.user;
    const fotoURL = `${API}/user/${user.cim}/picture/small`;

    const [withoutPicture, setWithoutPicture] = useState(false);
    const onImageLoadError = () => {
        setWithoutPicture(true);
    }

    useEffect(() => {
        // Recomeçar state ao atualizar as props do user
        setWithoutPicture(false);
    }, [user]);


    const modalContent = (
        <ModalDeputado user={user} />
    );

    const modalFooterContent = (
        <div>
            <button className="btnPrimary">
                <p>Gerenciar</p>
            </button>
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
            <img
                id="fotoURL"
                src={fotoURL}
                alt=""
                onError={onImageLoadError}
                className={withoutPicture ? 'defaultPicture' : ''}
            />
            <p id="nome">{capitalize(user.nome)}</p>
            <p id="cim">{user.cim}</p>
            <p id="loja">{capitalize(user.loja)}</p>
            <p id="lojaNumero">{user.lojaNumero}</p>
            <p id="cargo">{capitalize(user.cargo || '')}</p>
            <TextSituacao ativo={user.ativo} situacao={capitalize(user.situacao)} />
        </OpenModal>
    )
}