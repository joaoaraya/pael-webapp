"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API } from '@/functions/urls';
import IconLoader from '@/components/icon/IconLoader';
import './style.scss';

type FormsTypes = {
    id_cim: string;
    ds_password: string
}

export default function SignIn() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['token']);
    const { register, handleSubmit } = useForm<FormsTypes>();
    const [disableButton, setDisableButton] = useState(false);


    // Mostrar imagem do usuário ao digitar o CIM
    const [cimValue, setCimValue] = useState('');
    const [withoutPicture, setWithoutPicture] = useState(true);

    const onChangeCim = (event: any) => {
        setCimValue(event.target.value);
        setWithoutPicture(false);
    }

    const onImageLoadError = () => {
        setWithoutPicture(true);
    }

    // Enviar dados para o servidor
    const onSubmit = handleSubmit(async (data) => {
        try {
            setDisableButton(true); // Desabilitar o botão ao iniciar a solicitação

            // Enviar os dados em formato JSON
            const response = await axios.post(`${API}/user/login`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Verificar se a resposta contém um token
            const { token } = response.data;

            if (token) {
                // Salvar o token em um cookie seguro
                setCookie('token', token, { secure: true, sameSite: 'strict' });

                // Redirecionar para a página...
                router.push('/dashboard');
            }
            else {
                // Recarregar página
                console.log('Token não encontrado na resposta da API.');
            }
        }
        catch (error: any) {
            let message = "";

            if (error.response && error.response.data) {
                message = error.response.data.message;
            }
            else {
                message = "Falha no servidor! Tente novamente ou mais tarde";
            }
            window.alert(message);
            console.error('Erro ao fazer a solicitação:', error);
        }
        finally {
            // Após concluír a ação, reativar o botão
            setDisableButton(false);
        }
    });


    return (
        <div className="login">
            <img
                src={API + '/user/' + cimValue + '/picture/large'}
                alt=""
                onError={onImageLoadError}
                className={`profilePicture ${withoutPicture ? 'defaultPicture' : ''}`}
            />

            <form onSubmit={onSubmit}>
                <label>
                    <p>CIM:</p>

                    <input
                        {...register('id_cim')}
                        onChange={onChangeCim}
                        name="id_cim"
                        type="number"
                        autoComplete="id_cim"
                        placeholder="Digite seu CIM"
                        required
                    />
                </label>

                <label>
                    <p>Senha:</p>

                    <input
                        {...register('ds_password')}
                        name="ds_password"
                        type="password"
                        placeholder="******"
                        required
                    />
                </label>

                <button type="submit" className="btnPrimary" disabled={disableButton}>
                    {disableButton ? <IconLoader /> : <p>Entrar</p>}
                </button>
            </form>
        </div>
    );
}

