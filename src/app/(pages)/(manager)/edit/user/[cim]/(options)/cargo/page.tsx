"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { validateDate } from '@/functions/date';
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
    const [data, setData] = useState({ cargo: '', inicio: '', termino: '' });
    const [cargos, setCargos] = useState(["- Selecione -"])
    const [cargoNome, setCargoNome] = useState(cargos[0]);

    const userCIM = params.cim;


    /* Server functions */

    useEffect(() => {
        const checkUserIsAdmin = async () => {
            try {
                const responsePresidente = await get(`${API}/check/user/presidente`);
                const responseSecretarioVice = await get(`${API}/check/user/secretario-vice`);

                if (responsePresidente.data === true) {
                    return true;
                }
                else if (responseSecretarioVice.data === true) {
                    return true;
                }
                else {
                    return false;
                }
            }
            catch (error: any) {
                // Ações de erro no hook de API
                return false;
            }
        }

        const loadData = async () => {
            try {
                const userData = await get(`${API}/user/${userCIM}`);
                const userIsAdmin = await checkUserIsAdmin();
                const cargosData = await get(`${API}/cargos`);

                setCargos([...cargos, ...cargosData.data]);

                if (userIsAdmin) {
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
                dt_cargo_nomeacao: data.inicio,
                dt_cargo_termino: data.termino
            }

            let rota = `${API}/user/${userCIM}/cargo`;

            if (data.cargo === "PRESIDENTE") {
                rota = `${API}/user/${userCIM}/cargo=presidente`;
            }

            const response = await post(rota, 'application/json', JSON.stringify(updatedData));

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const finalizarCargo = async () => {
        try {
            const response = await put(`${API}/user/${userCIM}/cargo=end`);

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    /* Client functions */

    useEffect(() => {
        setData({
            ...data,
            cargo: cargoNome.toUpperCase()
        });

    }, [cargoNome]);

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.cargo === "" || data.cargo === cargos[0]) {
            return ("Selecione o cargo!");
        }
        else if (!data.inicio) {
            return ("Insira a data de início!");
        }
        else if (!validateDate(data.inicio)) {
            return ("Data de início inválida!");
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
                title={`Nomeá-lo com o cargo de: ${capitalize(data.cargo)}?`}
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
            action={() => finalizarCargo()}
            actionText="Finalizar"
            withPassword={true}
        >
            <p>Finalizar mandato</p>
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
                            <label className="selectbox" id="cargo">
                                <p>Selecione o cargo:</p>

                                <select onChange={(e) => { setCargoNome(e.target.value) }}>
                                    {cargos.map((cargo, index) => (
                                        <option key={index} value={cargo}>
                                            {capitalize(cargo)}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label className="inputLabel" id="inicio">
                                <p>Data de início:</p>

                                <InputMask
                                    className="inputText"
                                    type="text"
                                    mask="99/99/9999"
                                    placeholder="xx/xx/xxxx"
                                    onChange={(e) => setData({ ...data, inicio: formatDateToISO(e.target.value) })}
                                    autoComplete="off"
                                />
                            </label>

                            <label className="inputLabel" id="termino">
                                <p>Data de término:</p>

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
                            {voltarButton}
                        </div>
                    </>
                }
            </form >

            {showResponseModal}
        </div >
    );
}