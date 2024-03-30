"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import ButtonPessoa from '@/components/button/ButtonPessoa';
import LoadingPage from '@/components/session/LoadingPage';
import './style.scss';


type AutorProps = {
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
    cargo: string;
    ativo: boolean;
    situacao: string;
    situacaoData: string;
    dataNascimento?: string;
    cpf?: string;
    email?: string;
    celular?: string;
    cimSuplente?: string;
    nomeSuplente?: string;
    cargos?: {
        nome: string;
        dataNomeacao: string;
        dataTermino: string;
    }[];
}


export default function PageNovaAcaoLicenca() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, post } = useAPI();
    const [autor, setAutor] = useState<AutorProps>();
    const [data, setData] = useState({ motivo: '', dias: 0 });
    const [motivo, setMotivo] = useState('');
    const motivos = ["Saúde", "Mudança de Oriente", "Trabalho", "Estudo", "Viagem", "Missão Moçônica", "Exercício de cargo"];


    useEffect(() => {
        const loadData = async () => {
            try {
                const responseAutor = await get(`${API}/user/me`);
                setAutor(responseAutor.data);
                setIsLoading(false);
            }
            catch (error: any) {
                setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        setData({ ...data, motivo: motivo });
    }, [motivo]);


    const sendData = async () => {
        try {
            const response = await post(`${API}/acao/tipo=licenca`, 'application/json', JSON.stringify(data));

            if (response && response.status === 200) {
                const acaoID = response.data.details?.acao?.id;

                if (acaoID) {
                    setShowResponseModal(
                        <ResponseModal
                            icon={response.data.response}
                            message={response.data.message}
                            action={() => { router.push(`/acao/${acaoID}`) }}
                        />
                    )
                }
                else {
                    setShowResponseModal(<ResponseModal icon="error" message="Tente novamente ou mais tarde!" />);
                }
            }
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    // Formatar input de números
    const handleInputNumberChange = (campo: string, valor: string) => {
        // Apenas dígitos de 0 a 9
        const regex = /^[0-9]*$/;

        // Validar inputs apenas para números de 0 a 9
        if (regex.test(valor)) {
            // Remover zeros à esquerda, exceto se o valor for apenas zero
            const valorApenasNumeros = valor.replace(/^0+(?!$)/, '');

            // Verificar se o valor é nulo e atribuir o mínimo de 0 (exceto se for maior que 0)
            setData({
                ...data,
                [campo]: valorApenasNumeros === '' ||
                    parseInt(valorApenasNumeros, 10) === 0 ? '0' : valorApenasNumeros
            });
        }
    }

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.dias == 0) {
            return ("Digite os dias de afastamento!");
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
                title="Solicitar Pedido de Licença?"
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

    if (autor) {
        return (
            <div className="pageNovaAcaoLicenca">
                <div className="titulo">
                    <h1>Novo Pedido De Licença</h1>
                </div>

                <div className="autor">
                    <p id="label">Deputado:</p>
                    <ButtonPessoa user={autor} />
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formContainer">
                        <div className="selectbox">
                            <p>Selecione o motivo:</p>

                            <select onChange={(e) => { setMotivo(e.target.value) }}>
                                {motivos.map((motivo, index) => (
                                    <option key={index} value={motivo}>
                                        {motivo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <label className="inputLabel diasAfastamento">
                            <p>Dias de afastamento:</p>

                            <input
                                type="number"
                                className="inputText"
                                name="dias"
                                value={data.dias}
                                onChange={(e) => handleInputNumberChange('dias', e.target.value)}
                            />
                        </label>
                    </div>


                    <div className="actionButtons">
                        {submitButton("Solicitar")}

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
