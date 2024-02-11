"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import InputPasswordChecker from '@/components/input/InputPasswordChecker';
import CardInfo from '@/components/card/CardInfo';
import LoadingPage from '@/components/session/LoadingPage';

import './style.scss';


type PageProps = {
    cim: string;
}


export default function PageEditUserDados({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, put } = useAPI();
    const [data, setData] = useState({ password: '123', passwordConfirm: '' });
    const [passwordSecurity, setPasswordSecurity] = useState({ level: 0, text: "Senha fraca" });
    const [userPresidente, setUserPresidente] = useState(false);
    const [userAutor, setUserAutor] = useState(false);

    const userCIM = params.cim;


    useEffect(() => {
        const checkUserIsPresidente = async () => {
            try {
                const response = await get(`${API}/check/user/presidente`);
                setUserPresidente(response.data);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        const checkUserIsAutor = async (idCIM: string) => {
            try {
                const response = await get(`${API}/check/user/autor/cim=${idCIM}`);
                setUserAutor(response.data);
                setIsLoading(false);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        checkUserIsPresidente();
        checkUserIsAutor(userCIM);
    }, []);


    const sendData = async () => {
        try {
            const defaultPassword = "123#mudar";
            const updatedData = { ds_password: (userPresidente && !userAutor) ? defaultPassword : data.password };

            const response = await put(`${API}/user/${userCIM}/password`, 'application/json', JSON.stringify(updatedData));

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    const checkPasswordSecurity = (password: string) => {
        // Min: 3 letras (M/m), 2 números, 1 caracter especial (!@), 8 caracteres sem espaço
        const passwordMediumRegex = /^(?=.*[a-zA-Z]{3,})(?=.*\d{2,})(?=.*[\W_.]{1,})[^\s]{8,}$/;
        // Min: 3 letras minusculas (m), 1 letra Maiuscula (M), 3 números, 2 caracteres especiais (!@), 10 caracteres sem espaço
        const passwordHighRegex = /^(?=.*[a-z]{3,})(?=.*[A-Z]{1,})(?=.*\d{3,})(?=.*[\W_.]{2,})[^\s]{10,}$/;

        if (passwordHighRegex.test(password)) {
            setPasswordSecurity({ level: 2, text: "Senha forte" });
        }
        else if (passwordMediumRegex.test(password)) {
            setPasswordSecurity({ level: 1, text: "Senha média" });
        }
        else {
            setPasswordSecurity({ level: 0, text: "Senha fraca" });
        }
    }

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (!data.password && !data.passwordConfirm) {
            return ("Digite a nova senha nos 2 campos!");
        }
        else if (data.passwordConfirm !== data.password) {
            return ("Digite a mesma senha nos 2 campos!");
        }
        else if (passwordSecurity.level < 1) {
            return ("Sua senha é fraca. Siga as dicas para criar uma senha segura!");
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
                title="Salvar nova senha?"
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

    return (
        <div className="pageEditUserOption pageEditUserSenha">
            <div className="titulo">
                <h1>Senha</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                {(userPresidente && !userAutor) ?
                    <>
                        <div className="senhaDicas">
                            <CardInfo
                                titulo="O usuário esqueceu a senha?"
                                descricao="Poderá redefini-la para a senha padrão: 123#mudar"
                            />
                        </div>

                        <div className="actionButtons">
                            <OpenConfirmModal
                                tagType="button"
                                className="btnPrimary"
                                title="Redefinir senha desse usuário para a padrão?"
                                action={handleSubmit(sendData)}
                                actionText="Redefinir"
                            >
                                <p>Redefinir senha</p>
                            </OpenConfirmModal>

                            <button className="btnSecondary" onClick={router.back}>
                                <p>Voltar</p>
                            </button>
                        </div>
                    </>
                    :
                    <>
                        <div className="senhaDicas">
                            <CardInfo
                                titulo="Senha Média:"
                                descricao="No mínimo 8 caracteres, com 3 letras, 2 números e 1 caractere especial."
                            />

                            <CardInfo
                                cor="ok"
                                titulo="Senha Forte:"
                                descricao="No mínimo 10 caracteres, com 3 letras minúsculas, 1 letra maiúscula, 3 números e 2 caracteres especiais."
                            />
                        </div>

                        <label className="inputLabel">
                            <p>Nova senha:</p>

                            <input
                                className="inputText"
                                type="password"
                                placeholder="******"
                                onChange={(e) => {
                                    setData({ ...data, password: e.target.value })
                                    checkPasswordSecurity(e.target.value);
                                }}
                                autoComplete="off"
                            />

                            <InputPasswordChecker security={passwordSecurity} />
                        </label>

                        <label className="inputLabel">
                            <p>Confirmar nova senha:</p>

                            <input
                                className="inputText"
                                type="password"
                                placeholder="******"
                                onChange={(e) => setData({ ...data, passwordConfirm: e.target.value })}
                                autoComplete="off"
                            />
                        </label>


                        <div className="actionButtons">
                            {submitButton("Salvar")}

                            <button className="btnSecondary" onClick={router.back}>
                                <p>Voltar</p>
                            </button>
                        </div>
                    </>
                }
            </form>

            {showResponseModal}
        </div >
    );
}