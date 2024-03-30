"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize, formatDateISOToBR } from '@/functions/visual';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import LoadingPage from '@/components/session/LoadingPage';

import './style.scss';
import TextSituacao from '@/components/text/TextSituacao';
import { getDateBrasilia } from '@/functions/date';


type PageProps = {
    cim: string;
}

type UserDataProps = {
    ativo: boolean;
    situacao: string;
    situacaoData: string;
}


export default function PageEditUserSituacao({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, put } = useAPI();
    const situacoes = ["ATIVO", "INATIVO", "FALECIDO"];
    const [data, setData] = useState({ situacao: situacoes[0], ativo: 1 });
    const [userData, setUserData] = useState<UserDataProps>();
    const [situacao, setSituacao] = useState(situacoes[0]);

    const userCIM = params.cim;


    useEffect(() => {
        setData({
            ...data,
            ativo: situacao === "ATIVO" ? 1 : 0,
            situacao: situacao
        });

    }, [situacao]);


    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/user/${userCIM}`);
                setUserData(response.data);

                setIsLoading(false);
            }
            catch (error: any) {
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    const sendData = async () => {
        try {
            const updatedData = {
                ic_ativo: data.ativo,
                ds_situacao: data.situacao,
                dt_situacao: getDateBrasilia()
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


    if (isLoading) {
        return (<LoadingPage />)
    }

    if (userData) {
        return (
            <div className="pageEditUserOption pageEditUserSituacao">
                <div className="titulo">
                    <h1>Situação</h1>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="situacaoAtual">
                        <p className="label">Situação atual:</p>
                        <TextSituacao ativo={userData.ativo} situacao={capitalize(userData.situacao)} />
                        <p className="label">Desde:</p>
                        <p className="textDate">{formatDateISOToBR(userData.situacaoData)}</p>
                    </div>

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
}