"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import InputFileDoc from '@/components/input/InputFileDoc';


export default function PageNovoDocumentoOficial() {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const { post } = useAPI();
    const [data, setData] = useState({ doc_name: '' });
    const [docFile, setDocFile] = useState<File | null>();
    const [showResponseModal, setShowResponseModal] = useState(<></>);


    const sendData = async () => {
        try {
            const formData = new FormData();
            if (docFile) {
                formData.append('doc_file', docFile);
            }
            formData.append('doc_name', data.doc_name);

            const response = await post(`${API}/doc`, 'multipart/form-data', formData);

            setShowResponseModal(
                <ResponseModal
                    icon={response.data.response}
                    message={response.data.message}
                    action={() => { router.push('/dashboard/documentos') }}
                />
            );
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const getFileFromInput = async (file: File | null) => {
        if (file) {
            try {
                setDocFile(file);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.doc_name === "") {
            return ("Digite uma descrição!");
        }
        else if (!docFile) {
            return ("Anexe um documento!");
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
                title="Publicar documento na lista oficial?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    return (
        <div className="pageNovoDocumentoOficial">
            <div className="titulo">
                <h1>Novo Documento Oficial</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <label className="inputLabel">
                    <p>Descrição:</p>

                    <input
                        className="inputText"
                        placeholder="Descrição curta do documento"
                        onChange={(e) => setData({ ...data, doc_name: e.target.value })}
                        maxLength={100}
                    />
                </label>

                <InputFileDoc onSelectedFile={getFileFromInput} />

                <div className="actionButtons">
                    {submitButton("Publicar")}

                    <button className="btnSecondary" onClick={router.back}>
                        <p>Voltar</p>
                    </button>
                </div>
            </form>

            {showResponseModal}
        </div>
    );
}
