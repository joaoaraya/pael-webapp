import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import './style.scss';


type ModalProps = {
    doc: {
        nome: string;
        nomeArquivo: string;
    }
}


export default function ModalEditarDescricaoDoc(props: ModalProps) {
    const { handleSubmit } = useForm();
    const { put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [data, setData] = useState({ nome: props.doc.nome });

    const defaultName = props.doc.nome;


    const sendData = async () => {
        try {
            const updatedData = {
                nm_doc: data.nome
            }
            const response = await put(
                `${API}/doc/${props.doc.nomeArquivo}`,
                "application/json",
                JSON.stringify(updatedData)
            )

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.nome === "") {
            return ("Digite uma descrição!");
        }
        else if (data.nome === defaultName) {
            return ("Nenhuma alteração na descrição!");
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
                title="Salvar nova descrição do documento?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    return (
        <div className="modalEditarDescricaoDoc">
            <form onSubmit={(e) => e.preventDefault()}>
                <label className="inputLabel">
                    <p>Descrição:</p>

                    <input
                        className="inputText"
                        type="text"
                        placeholder="Descrição curta do documento"
                        defaultValue={props.doc.nome}
                        onChange={(e) => { setData({ nome: e.target.value }) }}
                        maxLength={100}
                        autoComplete="off"
                    />
                </label>

                {submitButton("Salvar")}
            </form>

            {showResponseModal}
        </div>
    );
}
