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


export default function ModalCadastrarVotos(props: ModalProps) {
    const { handleSubmit } = useForm();
    const { put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [data, setData] = useState({ aFavor: 0, contra: 0, abstencao: 0 });


    const sendData = async () => {
        try {
            const response = await put(
                `${API}/acao/${props.acaoId}/plenario/votos`,
                "application/json",
                JSON.stringify(data)
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            console.error('Error:', error);
        }
    }


    return (
        <div className="modalCadastrarVotos">
            <form onSubmit={(e) => e.preventDefault()}>
                <label>
                    <p>Votos a favor:</p>
                    <input
                        className="inputText"
                        name="aFavor"
                        onChange={(e) => { setData({ ...data, aFavor: e.target.value }) }}
                        maxLength={5}
                    />
                </label>

                <label>
                    <p>Votos contra:</p>
                    <input
                        className="inputText"
                        name="contra"
                        onChange={(e) => { setData({ ...data, contra: e.target.value }) }}
                        maxLength={5}
                    />
                </label>

                <label>
                    <p>Votos abstencao:</p>
                    <input
                        className="inputText"
                        name="abstencao"
                        onChange={(e) => { setData({ ...data, abstencao: e.target.value }) }}
                        maxLength={5}
                    />
                </label>

                <OpenConfirmModal
                    tagType="button"
                    className="btnPrimary"
                    title="Enviar resultados da votação"
                    action={handleSubmit(sendData)}
                    actionText="Gerar resultado"
                >
                    <p>Gerar resultado</p>
                </OpenConfirmModal>
            </form>

            {showResponseModal}
        </div>
    );
}