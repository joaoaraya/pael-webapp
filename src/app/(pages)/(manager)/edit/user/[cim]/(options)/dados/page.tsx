"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { formatDateISOToBR, formatDateToISO, formatInputOnlyNumbers } from '@/functions/visual';
import { validateDate } from '@/functions/date';

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
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
    dataNascimento?: string;
    cpf?: string;
    email?: string;
    celular?: string;
    nomeSuplente?: string;
    cimSuplente?: string;
}


export default function PageEditUserDados({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, put } = useAPI();
    const [data, setData] = useState<UserDataProps>();
    const [userPresidente, setUserPresidente] = useState(false);

    const userCIM = params.cim;


    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/user/${userCIM}`);
                setData(response.data);

                setIsLoading(false);
            }
            catch (error: any) {
                setIsLoading(false);
            }
        }

        const checkUserIsPresidente = async () => {
            try {
                const response = await get(`${API}/check/user/presidente`);
                setUserPresidente(response.data);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        loadData();
        checkUserIsPresidente();
    }, []);

    const sendData = async () => {
        try {
            const updatedData = {
                nm_pessoa: data?.nome,
                dt_nascimento: data?.dataNascimento,
                nr_cpf: data?.cpf,
                ds_email: data?.email,
                nr_celular: data?.celular,
                nm_loja: data?.lojaNumero,
                id_loja: data?.loja,
                nm_suplente: data?.nomeSuplente,
                id_cim_suplente: data?.cimSuplente
            }

            const response = await put(`${API}/user/${userCIM}`, 'application/json', JSON.stringify(updatedData));

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data) {
            if (!data.nome || data.nome === "") {
                return ("Digite o nome completo!");
            }
            else if (!data.dataNascimento) {
                return ("Insira a data de nascimento!");
            }
            else if (!validateDate(data.dataNascimento)) {
                return ("Data de nascimento inválida!");
            }
            else if (!data.cpf) {
                return ("Digite o CPF!");
            }
            else if (!data.celular) {
                return ("Digite o número de celular!");
            }
            if (userPresidente) {
                if (!data.loja) {
                    return ("Digite o nome da loja!");
                }
                else if (!data.lojaNumero) {
                    return ("Insira o número da loja!");
                }
                else if (!data.nomeSuplente) {
                    return ("Digite o nome do Suplente!");
                }
                else if (!data.cimSuplente || data.cimSuplente == '0') {
                    return ("Insira o CIM do Suplente!");
                }
            }
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
                title="Salvar dados?"
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

    if (data) {
        return (
            <div className="pageEditUserOption pageEditUserDados">
                <div className="titulo">
                    <h1>Dados Pessoais</h1>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="inputLabel">
                        <p>Nome completo:</p>

                        <input
                            className="inputText inputValueToUpperCase"
                            type="text"
                            placeholder="Digite o nome"
                            defaultValue={data.nome}
                            onChange={(e) => setData({ ...data, nome: e.target.value.toUpperCase() })}
                            maxLength={64}
                            autoComplete="off"
                        />
                    </label>

                    <label className="inputLabel">
                        <p>Data de nascimento:</p>

                        <InputMask
                            className="inputText"
                            type="text"
                            mask="99/99/9999"
                            placeholder="xx/xx/xxxx"
                            defaultValue={formatDateISOToBR(data.dataNascimento || '')}
                            onChange={(e) => setData({ ...data, dataNascimento: formatDateToISO(e.target.value) })}
                            autoComplete="off"
                        />
                    </label>

                    <label className="inputLabel">
                        <p>CPF:</p>

                        <InputMask
                            className="inputText"
                            type="text"
                            mask="999.999.999-99"
                            placeholder="xxx.xxx.xxx-xx"
                            defaultValue={data.cpf}
                            onChange={(e) => setData({ ...data, cpf: e.target.value.replace(/\D/g, '') })}
                            autoComplete="off"
                        />
                    </label>

                    <br />

                    <label className="inputLabel">
                        <p>Email:</p>

                        <input
                            className="inputText"
                            type="text"
                            placeholder="email@email.com"
                            defaultValue={data.email}
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            maxLength={255}
                            autoComplete="off"
                        />
                    </label>

                    <label className="inputLabel">
                        <p>Celular:</p>

                        <InputMask
                            className="inputText"
                            type="text"
                            mask="(99) 99999-9999"
                            placeholder="(xx) xxxxx-xxxx"
                            defaultValue={data.celular}
                            onChange={(e) => setData({ ...data, celular: e.target.value.replace(/\D/g, '') })}
                            autoComplete="off"
                        />
                    </label>

                    {userPresidente && (
                        <>
                            <br />

                            <label className="inputLabel">
                                <p>Nome da Loja:</p>

                                <input
                                    className="inputText inputValueToUpperCase"
                                    type="text"
                                    defaultValue={data.loja}
                                    onChange={(e) => setData({ ...data, loja: e.target.value.toUpperCase() })}
                                    maxLength={64}
                                    autoComplete="off"
                                />
                            </label>

                            <label className="inputLabel">
                                <p>Número da Loja:</p>

                                <input
                                    className="inputText"
                                    type="number"
                                    defaultValue={data.lojaNumero}
                                    onChange={(e) => setData({ ...data, lojaNumero: e.target.value.replace(/\D/g, '') })}
                                    maxLength={8}
                                    autoComplete="off"
                                />
                            </label>

                            <br />

                            <label className="inputLabel">
                                <p>Nome completo do Suplente:</p>

                                <input
                                    className="inputText inputValueToUpperCase"
                                    type="text"
                                    defaultValue={data.nomeSuplente}
                                    onChange={(e) => setData({ ...data, nomeSuplente: e.target.value.toUpperCase() })}
                                    maxLength={64}
                                    autoComplete="off"
                                />
                            </label>

                            <label className="inputLabel">
                                <p>CIM do Suplente:</p>

                                <input
                                    className="inputText"
                                    type="number"
                                    defaultValue={data.cimSuplente}
                                    value={data.cimSuplente}
                                    placeholder="xxxxxx"
                                    onChange={(e) => setData({ ...data, cimSuplente: formatInputOnlyNumbers(e.target.value, 8) })}
                                    maxLength={8}
                                    autoComplete="off"
                                />
                            </label>
                        </>
                    )}


                    <div className="actionButtons">
                        {submitButton("Salvar")}

                        <button className="btnSecondary" onClick={router.back}>
                            <p>Voltar</p>
                        </button>
                    </div>
                </form>

                {showResponseModal}
            </div>
        )
    }
}