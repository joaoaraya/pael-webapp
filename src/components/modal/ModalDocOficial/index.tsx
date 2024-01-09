'use-strict';

import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';
import Icon from '@/components/icon/Icon';
import iconPdf from '@/assets/images/iconPdf.png';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
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
    const doc = props.doc;
    const { del } = useAPI();

    const deleteDoc = async () => {
        try {
            const response = await del(`${API}/doc/${doc.nomeArquivo}`);

            if (response) {
                window.alert(response.data.message);
                location.reload();
            }
        }
        catch (error: any) {
            console.error('Error:', error);
            window.alert('Não foi possível deletar documento');
            location.reload();
        }
    }

    return (
        <div className="modalDocOficial">
            <div className="details">
                <img id="icon" src={iconPdf.src} alt="" />
                <p id="desc">{doc.nome}</p>
            </div>

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
    )
}