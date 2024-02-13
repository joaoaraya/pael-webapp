"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { getDateISO, validateDate } from '@/functions/date';
import { capitalize, formatDateISOToBR, formatDateToISO } from '@/functions/visual';

import InputMask from 'react-input-mask';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import LoadingPage from '@/components/session/LoadingPage';

import './style.scss';


type PageProps = {
    cim: string;
}

type UserDataProps = {
    cargo: string;
    cargos: {
        nome: string;
        dataNomeacao: string;
        dataTermino: string;
    }[];
}


export default function PageEditUserCargo({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, post, put } = useAPI();
    const [user, setUser] = useState<UserDataProps>();
    const [data, setData] = useState({ cargo: '', termino: '' });

    const userCIM = params.cim;

    /* Server functions */

    useEffect(() => {
        const checkUserIsPresidente = async () => {
            try {
                const response = await get(`${API}/check/user/presidente`);
                return response.data;
            }
            catch (error: any) {
                // Ações de erro no hook de API
                return false;
            }
        }

        const loadData = async () => {
            try {
                const userData = await get(`${API}/user/${userCIM}`);
                const isPresidente = await checkUserIsPresidente();

                if (isPresidente) {
                    setUser(userData.data);
                    setIsLoading(false);
                }
                else {
                    router.push("/edit/user/me");
                }
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
                nm_cargo: data.cargo,
                dt_cargo_nomeacao: getDateISO(),
                dt_cargo_termino: data.termino
            }
            const response = await post(`${API}/user/${userCIM}/cargo`, 'application/json', JSON.stringify(updatedData));

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const setCargo = async (cargo: string) => {
        try {
            const response = await put(`${API}/user/${userCIM}/cargo=${cargo}`);

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    /* Client functions */

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.cargo === "") {
            return ("Digite o cargo!");
        }
        else if (!data.termino) {
            return ("Insira a data de término!");
        }
        else if (!validateDate(data.termino)) {
            return ("Data de término inválida!");
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
                title={`Nomear cargo de ${capitalize(data.cargo)}, agora?`}
                action={handleSubmit(sendData)}
                actionText={buttonText}
                withPassword={true}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }

    // Outros botões
    const finalizarMandatoButton = (
        <OpenConfirmModal
            tagType="button"
            className="btnPrimary"
            title="Finalizar o mandato agora?"
            action={() => setCargo("end")}
            actionText="Finalizar"
            withPassword={true}
        >
            <p>Finalizar mandato</p>
        </OpenConfirmModal>
    );

    const nomearPresidenteButton = (
        <OpenConfirmModal
            tagType="button"
            className="btnPrimary"
            title="Transferir meu cargo de Presidente para o Deputado?"
            action={() => setCargo("presidente")}
            actionText="Confirmar"
            withPassword={true}
        >
            <p>Nomear Presidente</p>
        </OpenConfirmModal>
    );

    const voltarButton = (
        <button className="btnSecondary" onClick={router.back}>
            <p>Voltar</p>
        </button>
    );


    if (isLoading) {
        return (<LoadingPage />)
    }

    return (
        <div className="pageEditUserOption pageEditUserCargo">
            <div className="titulo">
                <h1>Cargo</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                {(user && user.cargo && user.cargos) ?
                    <>
                        <div className="cargoCard">
                            <h1>Cargo atual:</h1>
                            <h2>{capitalize(user.cargo)}</h2>

                            <div id="date">
                                <p>Início em: <b>{formatDateISOToBR(user.cargos[0].dataNomeacao)}</b></p>
                                <p>•</p>
                                <p>Término em: <b>{formatDateISOToBR(user.cargos[0].dataTermino)}</b></p>
                            </div>
                        </div>

                        <div className="actionButtons">
                            {finalizarMandatoButton}
                            {voltarButton}
                        </div>
                    </>
                    :
                    <>
                        <div className="novoCargo">
                            <label className="inputLabel" id="cargo">
                                <p>Novo cargo:</p>

                                <input
                                    className="inputText inputValueToUpperCase"
                                    type="text"
                                    placeholder="Ex.: vice-presidente"
                                    onChange={(e) => setData({ ...data, cargo: e.target.value.toUpperCase() })}
                                    maxLength={64}
                                    autoComplete="off"
                                />
                            </label>

                            <label className="inputLabel" id="inicio">
                                <p>Início:</p>

                                <InputMask
                                    className="inputText"
                                    type="text"
                                    mask="99/99/9999"
                                    value={formatDateISOToBR(getDateISO())}
                                    disabled
                                />
                            </label>

                            <label className="inputLabel" id="termino">
                                <p>Previsão de término:</p>

                                <InputMask
                                    className="inputText"
                                    type="text"
                                    mask="99/99/9999"
                                    placeholder="xx/xx/xxxx"
                                    onChange={(e) => setData({ ...data, termino: formatDateToISO(e.target.value) })}
                                    autoComplete="off"
                                />
                            </label>
                        </div>

                        <div className="actionButtons">
                            {submitButton("Nomear cargo")}
                            {nomearPresidenteButton}
                            {voltarButton}
                        </div>
                    </>
                }
            </form >

            {showResponseModal}
        </div >
    );
}