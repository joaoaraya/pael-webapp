import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import './style.scss';
import OpenResponseModal from '@/components/button/OpenResponseModal';


type ModalProps = {
    comissao: {
        id: number;
        nome: string;
    }
}


export default function ModalEditarTituloComissao(props: ModalProps) {
    const { handleSubmit } = useForm();
    const { put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [data, setData] = useState({ nm_comissao: props.comissao.nome });

    const defaultName = props.comissao.nome;


    const sendData = async () => {
        try {
            const response = await put(
                `${API}/comissao/${props.comissao.id}`,
                "application/json",
                JSON.stringify(data)
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (!data.nm_comissao) {
            return ("Digite um título para a comissão!");
        }
        else if (!data.nm_comissao.startsWith("COMISSÃO")) {
            return ('Digite "Comissão" no início do título! Exemplo: Comissão de Tecnologia.');
        }
        else if (data.nm_comissao === defaultName) {
            return ("Nenhuma alteração no título!");
        }
        return null;
    }

    // Qual botão mostrar?
    const submitButton = (buttonText: string) => {
        const validationMessage = validateForms();

        if (validationMessage) {
            return (
                <OpenResponseModal
                    tagType="button"
                    className="btnPrimary"
                    icon="warning"
                    message={validationMessage}
                >
                    <p>{buttonText}</p>
                </OpenResponseModal>
            );
        }

        return (
            <OpenConfirmModal
                tagType="button"
                className="btnPrimary"
                title="Salvar novo título da comissão?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    return (
        <div className="modalEditarTituloComissao">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="inputLabel">
                    <p>Título da comissão:</p>

                    <input
                        className="inputText inputValueToUpperCase"
                        type="text"
                        placeholder="Ex.: Comissão de Tecnologia"
                        defaultValue={props.comissao.nome}
                        onChange={(e) => { setData({ nm_comissao: e.target.value.toUpperCase() }) }}
                        maxLength={64}
                        autoComplete="off"
                    />
                </label>

                {submitButton("Salvar")}
            </form>

            {showResponseModal}
        </div>
    );
}
