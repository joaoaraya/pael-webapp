'use-strict';

import { useState } from 'react';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';
import Icon from '@/components/icon/Icon';
import iconPdf from '@/assets/images/iconPdf.png';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '../ResponseModal';
import './style.scss';


type ModalProps = {
    doc: {
        id: string;
        nome: string;
        nomeArquivo: string;
        cimAutor: string;
    }
}


export default function ModalDocOficial(props: ModalProps) {
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const doc = props.doc;
    const { del } = useAPI();


    const deleteDoc = async () => {
        try {
            const response = await del(`${API}/doc/${doc.nomeArquivo}`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    return (
        <div className="modalDocOficial">
            <div className="details">
                <img id="icon" src={iconPdf.src} alt="" />
                <p id="desc">{doc.nome}</p>
            </div>

            <div className="actions">
                <a href={API + '/doc/' + doc.nomeArquivo} target="_blank">
                    <button className="btnSecondary">
                        <Icon nome="doc" />
                        <p>Visualizar</p>
                    </button>
                </a>

                <Link href={'/edit/doc/' + doc.nomeArquivo}>
                    <button className="btnSecondary">
                        <Icon nome="edit" />
                        <p>Editar descrição</p>
                    </button>
                </Link>

                <OpenConfirmModal
                    tagType="button"
                    className="btnSecondary attention"
                    title="Excluir Documento?"
                    text="A ação não poderá ser desfeita"
                    action={deleteDoc}
                    actionText="Excluir"
                >
                    <Icon nome="delete" />
                    <p>Excluir</p>
                </OpenConfirmModal>
            </div>

            {showResponseModal}
        </div>
    )
}