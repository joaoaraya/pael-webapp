"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import InputFileDoc from '@/components/input/InputFileDoc';
import ButtonPessoa from '@/components/button/ButtonPessoa';
import ErrorPage from '@/components/session/ErrorPage';
import LoadingPage from '@/components/session/LoadingPage';
import CardInfo from '@/components/card/CardInfo';

import './style.scss';


type PageProps = {
    tipo: string;
}

type AcaoProps = {
    titulo: string;
    info: {
        titulo: string;
        descricao: string;
    }
    assinaturasNecessarias: number;
}

type AutorProps = {
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
    cargo: string;
    ativo: boolean;
    situacao: string;
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


export default function PageNovaAcaoProposta({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(0);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, post } = useAPI();
    const [acao, setAcao] = useState<AcaoProps>();
    const [autor, setAutor] = useState<AutorProps>();
    const [data, setData] = useState({ tipo: '', texto: '', aceitarEmenda: 1 });
    const [propostaFechada, setPropostaFechada] = useState(false);
    const [docFile, setDocFile] = useState<File | null>();
    const [docName, setDocName] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                const responseAcao = await get(`${API}/acao/proposta/${params.tipo}`);
                const responseAutor = await get(`${API}/user/me`);

                setAcao(responseAcao.data);
                setAutor(responseAutor.data);

                setIsLoading(false);
            }
            catch (error: any) {
                const errorMessage = error.toString().slice(7);

                // Se a ação não existir
                if (errorMessage === "Tipo de ação inválido!") {
                    setErrorStatus(404);
                }
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        setData({
            ...data,
            tipo: acao ? acao.titulo : '',
            aceitarEmenda: propostaFechada ? 0 : 1 // Inverter resultados
        })
    }, [acao, propostaFechada]);


    const sendData = async () => {
        try {
            const response = await post(`${API}/acao/tipo=proposta`, 'application/json', JSON.stringify(data));

            if (response && response.status === 200) {
                const acaoID = response.data.details?.acao?.id;

                if (acaoID) {
                    if (docFile) {
                        const formData = new FormData();
                        formData.append('doc_file', docFile);
                        formData.append('doc_name', docName);

                        await post(`${API}/acao/${acaoID}/doc`, 'multipart/form-data', formData);
                    }

                    setShowResponseModal(
                        <ResponseModal
                            icon={response.data.response}
                            message={response.data.message}
                            action={() => { router.push(`/acao/${acaoID}`) }}
                        />
                    );
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

    const getFileFromInput = async (file: File | null) => {
        if (file) {
            try {
                setDocFile(file);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.texto === "") {
            return ("Digite um texto para sua proposta!");
        }
        else if (docFile && docName === "") {
            return ("Digite um título para o anexo!");
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
                title="Publicar essa Proposta?"
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

    if (acao && autor) {
        return (
            <div className="pageNovaAcaoProposta">
                <div className="titulo">
                    <h1>Novo(a) {capitalize(acao.titulo)}</h1>
                </div>

                <div className="autor">
                    <p id="label">Deputado:</p>
                    <ButtonPessoa user={autor} />
                </div>

                <div className="info">
                    <CardInfo titulo={acao.info.titulo} descricao={acao.info.descricao} />
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="inputLabel">
                        <p>Proposta:</p>

                        <textarea
                            className="inputText"
                            placeholder="Digite o texto da proposta aqui..."
                            onChange={(e) => setData({ ...data, texto: e.target.value.replace(/\r?\n/g, "\n") })}
                        />
                    </label>

                    <InputFileDoc onSelectedFile={getFileFromInput} />

                    {docFile && (
                        <input
                            className="inputText"
                            placeholder="Digite um novo título para esse anexo"
                            onChange={(e) => setDocName(e.target.value)}
                            maxLength={100}
                        />
                    )}

                    <label className={`checkbox ${propostaFechada && 'checked'}`}>
                        <input
                            type="checkbox"
                            onChange={() => setPropostaFechada(!propostaFechada)}
                            checked={propostaFechada}
                        />
                        <p>Proposta fechada (Emendas não serão aceitas)</p>
                    </label>

                    <p>Assinaturas necessárias: <b>{acao.assinaturasNecessarias}</b></p>


                    <div className="actionButtons">
                        {submitButton("Publicar")}

                        <button className="btnSecondary" onClick={router.back}>
                            <p>Voltar</p>
                        </button>
                    </div>
                </form>

                {showResponseModal}
            </div>
        )
    }

    if (errorStatus === 404) {
        return (
            <div className="pageNovaAcaoProposta">
                <ErrorPage icon="failed" title="404" text="Página não encontrada!" />
            </div>
        )
    }
}
