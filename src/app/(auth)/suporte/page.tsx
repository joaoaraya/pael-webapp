"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API } from '@/functions/urls';
import IconLoader from '@/components/icon/IconLoader';
import ResponseModal from '@/components/modal/ResponseModal';
import profilePicture from '@/assets/images/defaultProfilePictureDark.png'
import './style.scss';


type FormsTypes = {
    ds_password: string
}


export default function SignIn() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['token']);
    const { register, handleSubmit } = useForm<FormsTypes>();
    const [disableButton, setDisableButton] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(<></>);


    // Enviar dados para o servidor
    const sendData = handleSubmit(async (data) => {
        try {
            setDisableButton(true); // Desabilitar o botão ao iniciar a solicitação

            const loginData = {
                id_cim: "000000",
                ds_password: data.ds_password
            }

            // Enviar os dados em formato JSON
            const response = await axios.post(`${API}/user/login`, JSON.stringify(loginData), {
                headers: { 'Content-Type': 'application/json' }
            });

            const { token } = response.data; // Verificar se a resposta contém um token

            if (token) {
                setCookie('token', token, { secure: true, sameSite: 'strict' }); // Salvar o token em um cookie seguro
                router.push('/dashboard'); // Redirecionar para a página...
            }
            else {
                setShowResponseModal(<ResponseModal icon="error" message="Erro interno! Tente novamente ou mais tarde" />);
            }
        }
        catch (error: any) {
            let message = "Falha no servidor! Tente novamente ou mais tarde";

            if (error.response && error.response.data) {
                message = error.response.data.message || message;
            }
            setShowResponseModal(<ResponseModal icon="error" message={message} />);
            console.error("Erro: ", error);
        }
        finally {
            setDisableButton(false); // Reativar o botão após concluír a ação
        }
    });


    return (
        <div className="suporte">
            <div className="profile">
                <img src={profilePicture.src} alt="" />
                <h1>Suporte</h1>
            </div>

            <form onSubmit={sendData}>
                <label>
                    <p>Senha:</p>

                    <input
                        {...register('ds_password')}
                        className="inputText"
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

            {showResponseModal}
        </div>
    );
}

