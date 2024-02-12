"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { formatDateToISO, formatInputOnlyNumbers } from '@/functions/visual';
import { validateDate } from '@/functions/date';

import InputMask from 'react-input-mask';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import CardInfo from '@/components/card/CardInfo';


export default function PageNovoDeputado() {
    const router = useRouter();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { post } = useAPI();
    const [data, setData] = useState({
        cim: '',
        nome: '',
        dataNascimento: '',
        cpf: '',
        email: '',
        celular: '',
        lojaNumero: '',
        loja: '',
        cimSuplente: '',
        nomeSuplente: ''
    });


    const sendData = async () => {
        try {
            const userLogin = {
                id_cim: data.cim,
                ds_password: "123#mudar"
            }

            const userData = {
                id_cim: data.cim,
                nm_pessoa: data.nome,
                dt_nascimento: data.dataNascimento,
                nr_cpf: data.cpf,
                ds_email: data.email,
                nr_celular: data.celular,
                id_loja: data.lojaNumero,
                nm_loja: data.loja,
                id_cim_suplente: data.cimSuplente,
                nm_suplente: data.nomeSuplente,
                ic_ativo: 1,
                ds_situacao: "ATIVO",
            }

            const newUserLogin = await post(`${API}/user/register`, 'application/json', JSON.stringify(userLogin));

            if (newUserLogin) {
                const newUserData = await post(`${API}/user`, 'application/json', JSON.stringify(userData));

                setShowResponseModal(
                    <ResponseModal
                        icon={newUserData.data.response}
                        message={newUserData.data.message}
                        action={() => { router.push(`/edit/user/${data.cim}`) }}
                    />
                );
            }
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (!data.cim || data.cim == '0') {
            return ("Insira o CIM!");
        }
        else if (!data.nome) {
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
        else if (!data.lojaNumero) {
            return ("Insira o número da loja!");
        }
        else if (!data.loja) {
            return ("Digite o nome da loja!");
        }
        else if (!data.cimSuplente || data.cimSuplente == '0') {
            return ("Insira o CIM do Suplente!");
        }
        else if (!data.nomeSuplente) {
            return ("Digite o nome do Suplente!");
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
                title="Cadastrar novo Deputado?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    return (
        <div className="pageNovoDeputado">
            <div className="titulo">
                <h1>Novo Deputado</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <label className="inputLabel">
                    <p>CIM*:</p>

                    <input
                        className="inputText"
                        type="number"
                        placeholder="xxxxxx"
                        value={data.cim}
                        onChange={(e) => setData({ ...data, cim: formatInputOnlyNumbers(e.target.value, 6) })}
                        autoComplete="off"
                    />
                </label>

                <CardInfo
                    titulo="Não será possível alterar o CIM após cadastrar!"
                    icone="warning"
                />

                <br />

                <label className="inputLabel">
                    <p>Nome completo*:</p>

                    <input
                        className="inputText inputValueToUpperCase"
                        type="text"
                        onChange={(e) => setData({ ...data, nome: e.target.value.toUpperCase() })}
                        maxLength={64}
                        autoComplete="off"
                    />
                </label>

                <label className="inputLabel">
                    <p>Data de nascimento*:</p>

                    <InputMask
                        className="inputText"
                        type="text"
                        mask="99/99/9999"
                        placeholder="xx/xx/xxxx"
                        onChange={(e) => setData({ ...data, dataNascimento: formatDateToISO(e.target.value) })}
                        autoComplete="off"
                    />
                </label>

                <label className="inputLabel">
                    <p>CPF*:</p>

                    <InputMask
                        className="inputText"
                        type="text"
                        mask="999.999.999-99"
                        placeholder="xxx.xxx.xxx-xx"
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
                        onChange={(e) => setData({ ...data, celular: e.target.value.replace(/\D/g, '') })}
                        autoComplete="off"
                    />
                </label>

                <br />

                <label className="inputLabel">
                    <p>Número da Loja*:</p>

                    <input
                        className="inputText"
                        type="number"
                        onChange={(e) => setData({ ...data, lojaNumero: e.target.value.replace(/\D/g, '') })}
                        maxLength={8}
                        autoComplete="off"
                    />
                </label>

                <label className="inputLabel">
                    <p>Nome da Loja*:</p>

                    <input
                        className="inputText inputValueToUpperCase"
                        type="text"
                        onChange={(e) => setData({ ...data, loja: e.target.value.toUpperCase() })}
                        maxLength={64}
                        autoComplete="off"
                    />
                </label>

                <br />

                <label className="inputLabel">
                    <p>CIM do Suplente*:</p>

                    <input
                        className="inputText"
                        type="number"
                        placeholder="xxxxxx"
                        value={data.cimSuplente}
                        onChange={(e) => setData({ ...data, cimSuplente: formatInputOnlyNumbers(e.target.value, 8) })}
                        autoComplete="off"
                    />
                </label>

                <label className="inputLabel">
                    <p>Nome completo do Suplente*:</p>

                    <input
                        className="inputText inputValueToUpperCase"
                        type="text"
                        onChange={(e) => setData({ ...data, nomeSuplente: e.target.value.toUpperCase() })}
                        maxLength={64}
                        autoComplete="off"
                    />
                </label>

                <br />

                <CardInfo
                    titulo="Senha para o primeiro acesso:"
                    descricao="123#mudar"
                />

                <br />

                <div className="actionButtons">
                    {submitButton("Cadastrar")}

                    <button className="btnSecondary" onClick={router.back}>
                        <p>Voltar</p>
                    </button>
                </div>
            </form>

            {showResponseModal}
        </div>
    );
}
