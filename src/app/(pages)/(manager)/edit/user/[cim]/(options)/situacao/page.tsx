"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';

import './style.scss';


type PageProps = {
    cim: string;
}


export default function PageEditUserSituacao({ params }: { params: PageProps }) {
    const router = useRouter();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { put } = useAPI();
    const situacoes = ["ATIVO", "INATIVO", "FALECIDO"];
    const [data, setData] = useState({ situacao: situacoes[0], ativo: 1 });
    const [situacao, setSituacao] = useState(situacoes[0]);

    const userCIM = params.cim;


    useEffect(() => {
        setData({
            ...data,
            ativo: situacao === "ATIVO" ? 1 : 0,
            situacao: situacao
        });

    }, [situacao]);

    const sendData = async () => {
        try {
            const updatedData = {
                ds_situacao: data.situacao,
                ic_ativo: data.ativo
            }
            const response = await put(`${API}/user/${userCIM}`, 'application/json', JSON.stringify(updatedData));

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    // Botão enviar
    const submitButton = (buttonText: string) => {
        return (
            <OpenConfirmModal
                tagType="button"
                className="btnPrimary"
                title="Salvar alteração da situação?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    return (
        <div className="pageEditUserOption pageEditUserSituacao">
            <div className="titulo">
                <h1>Situação</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <div className="selectbox">
                    <p>Alterar para:</p>

                    <select onChange={(e) => { setSituacao(e.target.value) }}>
                        {situacoes.map((situacao, index) => (
                            <option key={index} value={situacao}>
                                {capitalize(situacao)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="actionButtons">
                    {submitButton("Salvar")}

                    <button className="btnSecondary" onClick={router.back}>
                        <p>Voltar</p>
                    </button>
                </div>
            </form>

            {showResponseModal}
        </div>
    );
}