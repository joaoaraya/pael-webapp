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
import ErrorPage from '@/components/session/ErrorPage';
import LoadingPage from '@/components/session/LoadingPage';
import CardInfo from '@/components/card/CardInfo';

import './style.scss';


type PageProps = {
    id: string;
}

type AcaoProps = {
    id: string;
    tipo: string;
    statusAtual: string;

    conteudoProposta?: {
        textoProposta: string;
        alteracoes: string;
    }

    conteudoEmenda?: {
        textoArtigo: string;
        textoProposta: string;
        textoJustificativa: string;
        alteracoes: string;
    }
}


export default function PageEditAcao({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(0);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, put } = useAPI();
    const [acao, setAcao] = useState<AcaoProps>();
    const [dataProposta, setDataProposta] = useState({ texto: '' });
    const [dataEmenda, setDataEmenda] = useState({ textoArtigo: '', textoProposta: '', textoJustificativa: '' });
    const [alteracoes, setAlteracoes] = useState('');

    const acaoID = params.id

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/acao/${acaoID}`);
                setAcao(response.data);
                setIsLoading(false);
            }
            catch (error: any) {
                const errorMessage = error.toString().slice(7);

                // Se a ação não existir
                if (errorMessage === "Ação não encontrada!") {
                    setErrorStatus(404);
                }
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        if (acao) {
            if (acao.conteudoProposta) {
                setDataProposta({ texto: acao.conteudoProposta.textoProposta });
                setAlteracoes(acao.conteudoProposta.alteracoes);
            }
            if (acao.conteudoEmenda) {
                setDataEmenda({
                    textoArtigo: acao.conteudoEmenda.textoArtigo,
                    textoProposta: acao.conteudoEmenda.textoProposta,
                    textoJustificativa: acao.conteudoEmenda.textoJustificativa
                });
                setAlteracoes(acao.conteudoEmenda.alteracoes);
            }
        }
    }, [acao]);


    if (isLoading) {
        return (<LoadingPage />)
    }

    if (acao) {
        const sendData = async () => {
            const updatedData = acao.tipo === "proposta" ? dataProposta : dataEmenda;

            try {
                const response = await put(
                    `${API}/acao/${acaoID}/status=redacao`,
                    "application/json",
                    JSON.stringify(updatedData)
                );
                setShowResponseModal(
                    <ResponseModal
                        icon={response.data.response}
                        message={response.data.message}
                        action={() => router.push(`/acao/${acaoID}`)}
                    />);
            }
            catch (error: any) {
                setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
            }
        }


        // Validar formularios antes de liberar botão de enviar dados
        const validateForms = () => {
            if (acao.tipo === "proposta") {
                if (dataProposta.texto === "") {
                    return ("Digite um texto para sua proposta!");
                }
            }
            if (acao.tipo === "emenda") {
                if (dataEmenda.textoArtigo === "") {
                    return ("Digite o artigo!");
                }
                else if (dataEmenda.textoProposta === "") {
                    return ("Digite o texto para a proposta!");
                }
                else if (dataEmenda.textoJustificativa === "") {
                    return ("Digite o texto para a justificativa!");
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
                    title="Enviar alterações para o Presidente?"
                    action={handleSubmit(sendData)}
                    actionText={buttonText}
                >
                    <p>{buttonText}</p>
                </OpenConfirmModal>
            );
        }


        // Pagina 

        return (
            <div className="pageEditAcao">
                {acao.statusAtual === "autor" ? (
                    <>
                        <div className="titulo">
                            <h1>Editar {capitalize(acao.tipo)}</h1>
                        </div>

                        <div className="info">
                            <CardInfo
                                titulo="Alterações solicitadas pelo Presidente:"
                                descricao={alteracoes}
                                icone="edit"
                                cor="warning"
                            />
                        </div>

                        <form onSubmit={(e) => e.preventDefault()}>
                            {acao.tipo === "proposta" && (
                                <label className="inputLabel">
                                    <p>Proposta:</p>

                                    <textarea
                                        className="inputText"
                                        placeholder="Digite o texto da proposta aqui..."
                                        defaultValue={dataProposta.texto}
                                        onChange={(e) => setDataProposta({ ...dataProposta, texto: e.target.value.replace(/\r?\n/g, "\n") })}
                                    />
                                </label>
                            )}

                            {acao.tipo === "emenda" && (
                                <>
                                    <label className="inputLabel">
                                        <p>Artigo:</p>

                                        <input
                                            type="text"
                                            className="inputText"
                                            placeholder="Digite o artigo"
                                            defaultValue={dataEmenda.textoArtigo}
                                            onChange={(e) => setDataEmenda({ ...dataEmenda, textoArtigo: e.target.value })}
                                            maxLength={64}
                                        />
                                    </label>

                                    <label className="inputLabel">
                                        <p>Proposta:</p>

                                        <textarea
                                            className="inputText"
                                            placeholder="Digite o texto da proposta aqui..."
                                            defaultValue={dataEmenda.textoProposta}
                                            onChange={(e) => setDataEmenda({ ...dataEmenda, textoProposta: e.target.value.replace(/\r?\n/g, "\n") })}
                                        />
                                    </label>

                                    <label className="inputLabel">
                                        <p>Justificativa:</p>

                                        <textarea
                                            className="inputText"
                                            placeholder="Digite o texto da justificativa aqui..."
                                            defaultValue={dataEmenda.textoJustificativa}
                                            onChange={(e) => setDataEmenda({ ...dataEmenda, textoJustificativa: e.target.value.replace(/\r?\n/g, "\n") })}
                                        />
                                    </label>
                                </>
                            )}

                            <div className="actionButtons">
                                {submitButton("Enviar alterações")}

                                <button className="btnSecondary" onClick={router.back}>
                                    <p>Voltar</p>
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <>
                        <div className="pageEditAcao">
                            <ErrorPage icon="locked" title="Negado" text="Não é permitido enviar novas alterações!" />
                        </div>
                    </>
                )}

                {showResponseModal}
            </div>
        )
    }

    if (errorStatus === 404) {
        return (
            <div className="pageEditAcao">
                <ErrorPage icon="failed" title="404" text="Ação não encontrada!" />
            </div>
        )
    }
}
