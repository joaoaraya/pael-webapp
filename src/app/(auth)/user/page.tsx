'use client';

import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import InputMask from 'react-input-mask';
import InputProfilePicture from '@/components/input/InputProfilePicture';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import './style.scss';
import InputPasswordChecker from '@/components/input/InputPasswordChecker';


function readCookie(cookieName: string) {
    const [cookies] = useCookies([cookieName]);
    // Se o cookie não existir retornar null
    return cookies[cookieName] || null;
}


export default function User() {
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    const [userData, setUserData] = useState({
        nm_pessoa: '',
        nr_cpf: '',
        ds_email: '',
        nr_celular: '',
        ds_password: '',
        ds_password_confirm: ''
    });
    const [profilePicture, setProfilePicture] = useState<string | null>(null as string | null);
    const [formDataImage, setFormDataImage] = useState<FormData | null>(null);
    const [passwordSecurity, setPasswordSecurity] = useState({ level: 0, text: "Senha fraca" });
    const router = useRouter();

    const apiUrl = 'http://127.0.0.1:3333';

    /* Ler dados de login nos cookies */
    const idCim = readCookie('idCim');
    const token = readCookie('token');


    /* Server Functions */
    const getUserData = async () => {
        if (idCim && token) {
            try {
                const response = await axios.get(`${apiUrl}/userdata/${idCim}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // Preencha o estado userData com os dados obtidos na resposta
                setUserData(response.data);
            }
            catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                throw new Error('Erro ao buscar dados do usuário');
            }
        }
        else {
            throw new Error('ID ou token ausente');
        }
    }

    const getProfilePicture = async () => {
        if (idCim) {
            try {
                const response = await axios.get(`${apiUrl}/userdata/picture/${idCim}/large`, {
                    responseType: 'blob', // Definir o tipo de resposta
                });

                const image = URL.createObjectURL(new Blob([response.data]));
                return image;
            }
            catch (error) {
                console.error('Imagem de perfil não encontrada:', error);
                return null;
            }
        }
        else {
            return null;
        }
    }

    const updateUserData = async () => {
        if (idCim && token) {
            try {
                const userDataToJSON = JSON.stringify(userData);
                const response = await axios.put(`${apiUrl}/userdata/${idCim}`, userDataToJSON, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    // Dados atualizados!
                    return response.data;
                }
                else {
                    console.error('Erro ao atualizar dados do usuário:', response.status);
                    throw new Error(response.data);
                }
            }
            catch (error: any) {
                console.error('Erro ao atualizar dados do usuário:', error);
                throw new Error(error.response.data);
            }
        }
        else {
            throw new Error('CIM ou Token ausentes / Token expirado');
        }
    }

    const updateProfilePicture = async () => {
        if (idCim && token) {
            if (formDataImage) {
                try {
                    const response = await axios.put(`${apiUrl}/userdata/picture/${idCim}`, formDataImage, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    if (response.status === 200) {
                        // Imagem atualizada!
                        return response.data;
                    }
                    else {
                        console.error('Erro ao enviar a imagem:', response.status);
                        throw new Error(response.data);
                    }
                }
                catch (error: any) {
                    console.error('Erro ao enviar a imagem:', error);
                    throw new Error(error.response.data);
                }
            }
            else {
                console.log('Nenhuma imagem nova seleciona');
            }
        }
        else {
            // Se o token expirar -> informar o usuário a fazer login novamente
            throw new Error('ID, token ou formDataImage ausentes');
        }
    }

    const sendUpdatedData = async () => {
        const validatedForm = validateForms();

        if (validatedForm) {
            try {
                const sendUserData = await updateUserData();
                await updateProfilePicture();

                alert(sendUserData.message);
                location.reload();
            }
            catch (error) {
                window.alert("Erro ao atualizar dados!");
                console.error('Detalhes do erro:', error);
                location.reload();
            }
        }
    }


    /* Client Functions */
    const getProfilePictureFromInput = async (imageFile: File | null) => {
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append('profile_picture', imageFile);

                setFormDataImage(formData);
            }
            catch (error) {
                console.error(error);
            }
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

    const validateForms = () => {
        const { nm_pessoa, ds_password, ds_password_confirm } = userData;

        // Se os campos estiverem preenchidos
        if (nm_pessoa !== "" && ds_password !== undefined) {

            // Se os 2 campos de senha forem iguais
            if (ds_password === ds_password_confirm) {

                // Validar somente senha média ou forte
                if (passwordSecurity.level > 0) {
                    return true;
                }
                else {
                    window.alert("Sua senha é fraca, tente usar mais caracteres!");
                    return false;
                }
            }
            else {
                window.alert("Senhas não coincidem!");
                return false;
            }
        }
        else {
            window.alert("Você deixou seu nome ou senha em branco!");
            return false;
        }
    }


    useEffect(() => {
        const loadUserData = async () => {
            try {
                await getUserData();

                const imageFile = await getProfilePicture();
                setProfilePicture(imageFile);

                setIsLoading(false);
            }
            catch (error) {
                // Se der erro voltar para o inicio (Login)
                console.error('Erro ao carregar dados do usuário:', error);
                router.push('/');
            }
        }
        loadUserData();
    }, []);

    return (
        <>
            {isLoading ? (<></>) : (
                <div className="userEdit">
                    <form onSubmit={(e) => e.preventDefault()}>

                        <InputProfilePicture
                            imageFromAPI={profilePicture}
                            onImageSelected={getProfilePictureFromInput}
                        />

                        <label>
                            <p>Nome completo*:</p>
                            <input
                                name="nm_pessoa"
                                id="inputNomePessoa"
                                type="text"
                                placeholder="Digite seu nome"
                                defaultValue={userData.nm_pessoa}
                                onChange={(e) => {
                                    const nome = e.target.value;
                                    setUserData({ ...userData, nm_pessoa: nome.toUpperCase() })
                                }}
                                maxLength={64}
                                required
                            />
                        </label>

                        <label>
                            <p>CPF:</p>

                            <InputMask
                                name="nr_cpf"
                                type="text"
                                mask="999.999.999-99"
                                placeholder="xxx.xxx.xxx-xx"
                                defaultValue={userData.nr_cpf}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numericValue = inputValue.replace(/\D/g, ''); // Remove tudo que não for dígito
                                    setUserData({ ...userData, nr_cpf: numericValue });
                                }}
                            />
                        </label>

                        <label>
                            <p>Email:</p>
                            <input
                                name="ds_email"
                                type="text"
                                placeholder="email@email.com"
                                defaultValue={userData.ds_email}
                                onChange={(e) => setUserData({ ...userData, ds_email: e.target.value })}
                                maxLength={255}
                            />
                        </label>

                        <label>
                            <p>Celular:</p>
                            <InputMask
                                name="nr_celular"
                                type="text"
                                mask="(99) 99999-9999"
                                placeholder="(xx) xxxxx-xxxx"
                                defaultValue={userData.nr_celular}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    const numericValue = inputValue.replace(/\D/g, ''); // Remove tudo que não for dígito
                                    setUserData({ ...userData, nr_celular: numericValue });
                                }}
                            />
                        </label>

                        <label>
                            <p>
                                Nova senha*:
                            </p>
                            <input
                                name="ds_password"
                                type="password"
                                placeholder="******"
                                onChange={
                                    (e) => {
                                        setUserData({ ...userData, ds_password: e.target.value })
                                        checkPasswordSecurity(e.target.value);
                                    }}
                                required
                            />
                            <InputPasswordChecker
                                security={passwordSecurity}
                            />
                        </label>

                        <label>
                            <p>Confirmar nova senha*:</p>
                            <input
                                name="ds_password_confirm"
                                type="password"
                                placeholder="******"
                                onChange={(e) => setUserData({ ...userData, ds_password_confirm: e.target.value })}
                                required
                            />
                        </label>

                        <OpenConfirmModal
                            tagType="button"
                            className="btnPrimary btnSave"
                            confirmModalTitle="Salvar alterações"
                            confirmModalText="Deseja atualizar as informações novas?"
                            confirmModalAction={handleSubmit(sendUpdatedData)}
                            confirmModalActionText="Salvar"
                        >
                            <p>Salvar</p>
                        </OpenConfirmModal>
                    </form>
                </div>
            )}
        </>
    );
}
