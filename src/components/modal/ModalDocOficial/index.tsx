'use-strict';

import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';
import Icon from '@/components/icon/Icon';
import './style.scss';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';



type ModalProps = {
    docFileName: string;
}


export default function ModalDocOficial(props: ModalProps) {
    const { del } = useAPI();

    const deleteDoc = async () => {
        try {
            const response = await del(`${API}/doc/${props.docFileName}`);

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
            <a href={API + '/doc/' + props.docFileName} target="_blank">
                <button className="btnSecondary">
                    <Icon nome="doc" />
                    <p>Vizualizar</p>
                </button>
            </a>

            <Link href={'/edit/doc/' + props.docFileName}>
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