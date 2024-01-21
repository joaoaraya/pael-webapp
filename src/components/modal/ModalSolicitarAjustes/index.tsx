import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import './style.scss';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';


type ModalProps = {
    acaoId: string;
}


export default function ModalSolicitarAjustes(props: ModalProps) {
    const { handleSubmit } = useForm();
    const [data, setData] = useState({ alteracao: '' });
    const { put } = useAPI();

    const sendData = async () => {
        try {
            const response = await put(
                `${API}/acao/${props.acaoId}/status=autor`,
                "application/json",
                JSON.stringify(data)
            );
            window.alert(response.data.message);
            location.reload();
        }
        catch (error: any) {
            console.error('Error:', error);
            window.alert(error);
            location.reload();
        }
    }

    return (
        <div className="modalSolicitarAjustes">
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    <p>Ajustes:</p>
                    <input
                        name="alteracao"
                        type="text"
                        placeholder="Digite as alterações a serem feitas"
                        onChange={(e) => { setData({ alteracao: e.target.value }) }}
                        maxLength={400}
                        required
                    />
                </label>

                <OpenConfirmModal
                    tagType="button"
                    className="btnSecondary"
                    title="Enviar ajustes para o autor?"
                    action={handleSubmit(sendData)}
                    actionText="Enviar ajustes"
                >
                    <p>Enviar ajustes</p>
                </OpenConfirmModal>
            </form>
        </div>
    );
}