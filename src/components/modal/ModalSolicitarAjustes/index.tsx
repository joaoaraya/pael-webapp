import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import './style.scss';


type ModalProps = {
    acaoId: string;
}


export default function ModalSolicitarAjustes(props: ModalProps) {
    const { handleSubmit } = useForm();
    const { put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [data, setData] = useState({ alteracao: '' });


    const sendData = async () => {
        try {
            const response = await put(
                `${API}/acao/${props.acaoId}/status=autor`,
                "application/json",
                JSON.stringify(data)
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    return (
        <div className="modalSolicitarAjustes">
            <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                    className="inputText ajustes"
                    name="alteracao"
                    placeholder="Digite as alterações a serem feitas"
                    onChange={(e) => { setData({ alteracao: e.target.value.replace(/\r?\n/g, "\n") }) }}
                    maxLength={3000}
                />

                {data.alteracao !== "" && (
                    <OpenConfirmModal
                        tagType="button"
                        className="btnPrimary"
                        title="Enviar ajustes para o autor?"
                        action={handleSubmit(sendData)}
                        actionText="Enviar ajustes"
                    >
                        <p>Enviar ajustes</p>
                    </OpenConfirmModal>
                )}
            </form>

            {showResponseModal}
        </div>
    );
}
