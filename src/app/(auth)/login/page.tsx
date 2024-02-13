"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { API } from '@/functions/urls';
import IconLoader from '@/components/icon/IconLoader';
import './style.scss';
import ResponseModal from '@/components/modal/ResponseModal';
import Link from 'next/link';


type FormsTypes = {
    id_cim: string;
    ds_password: string
}


export default function SignIn() {
    const router = useRouter();
    const [cookies, setCookie] = useCookies(['token']);
    const { register, handleSubmit } = useForm<FormsTypes>();
    const [disableButton, setDisableButton] = useState(false);
    const [showResponseModal, setShowResponseModal] = useState(<></>);

    // Mostrar imagem do usuário ao digitar o CIM
    const [cimValue, setCimValue] = useState('');

    const onChangeCim = (event: any) => {
        setCimValue(event.target.value);
    }

    // Enviar dados para o servidor
    const sendData = handleSubmit(async (data) => {
        try {
            setDisableButton(true); // Desabilitar o botão ao iniciar a solicitação

            // Enviar os dados em formato JSON
            const response = await axios.post(`${API}/user/login`, JSON.stringify(data), {
                headers: { 'Content-Type': 'application/json' }
            });

            const { token } = response.data; // Verificar se a resposta contém um token

            if (token) {
                setCookie('token', token, { secure: true, sameSite: 'strict' }); // Salvar o token em um cookie seguro
                router.push('/dashboard'); // Redirecionar para a página...
            }
            else {
                // Recarregar página
                setShowResponseModal(<ResponseModal icon="error" message="Erro interno! Tente novamente ou mais tarde" />);
                console.log("Token não encontrado na resposta da API");
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
        <div className="login">
            <img
                className="profilePictureDark"
                src={`${API}/user/${cimValue === '' ? 0 : cimValue}/picture/large`}
                alt=""
            />

            <form onSubmit={sendData}>
                <label>
                    <p>CIM:</p>

                    <input
                        {...register('id_cim')}
                        className="inputText"
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

            <footer>
                <p>
                    &#169; 2024 PAEL&nbsp;
                    <a className="link" href="https://gobsp.com.br/" target="_blank">GOB-SP</a>
                    &nbsp; | &nbsp;
                    <Link className="link" href="/suporte">Suporte</Link>
                </p>
            </footer>

            {showResponseModal}
        </div>
    );
}

