"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { validateDate } from '@/functions/date';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import CardInfo from '@/components/card/CardInfo';


export default function PageNovaComissao() {
    const router = useRouter();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { post } = useAPI();
    const [data, setData] = useState({ titulo: '' });


    const sendData = async () => {
        try {
            const newData = {
                nm_comissao: data.titulo
            }
            const response = await post(`${API}/comissao`, 'application/json', JSON.stringify(newData));

            if (response && response.status === 200) {
                const id = response.data.details?.id;

                if (id) {
                    setShowResponseModal(
                        <ResponseModal
                            icon={response.data.response}
                            message={response.data.message}
                            action={() => { router.push(`/edit/comissao/${response.data.details.id}`) }}
                        />
                    )
                }
                else {
                    setShowResponseModal(<ResponseModal icon="error" message="Tente novamente ou mais tarde!" />);
                }
            }
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (!data.titulo) {
            return ("Digite um título para a comissão!");
        }
        else if (!data.titulo.startsWith("COMISSÃO")) {
            return ('Digite "Comissão" no início do título! Exemplo: Comissão de Tecnologia.');
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
                title="Criar nova comissão?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    return (
        <div className="pageNovaComissao">
            <div className="titulo">
                <h1>Nova Comissão</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <label className="inputLabel">
                    <p>Título:</p>

                    <input
                        className="inputText inputValueToUpperCase"
                        type="text"
                        placeholder="Ex.: Comissão de Tecnologia"
                        onChange={(e) => setData({ ...data, titulo: e.target.value.toUpperCase() })}
                        maxLength={64}
                        autoComplete="off"
                    />
                </label>

                <CardInfo
                    titulo="Os membros serão adicionados em seguida!"
                />

                <div className="actionButtons">
                    {submitButton("Criar comissão")}

                    <button className="btnSecondary" onClick={router.back}>
                        <p>Voltar</p>
                    </button>
                </div>
            </form>

            {showResponseModal}
        </div>
    );
}
