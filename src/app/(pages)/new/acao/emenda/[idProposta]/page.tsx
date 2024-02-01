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
import ButtonPessoa from '@/components/button/ButtonPessoa';
import ErrorPage from '@/components/session/ErrorPage';
import LoadingPage from '@/components/session/LoadingPage';
import CardInfo from '@/components/card/CardInfo';


type PageProps = {
    idProposta: string;
}

type AcaoProps = {
    tipos: {
        id: string,
        titulo: string,
        descricao: string
    }[];
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


export default function PageNovaAcaoEmenda({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(0);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, post } = useAPI();
    const [acao, setAcao] = useState<AcaoProps>();
    const [autor, setAutor] = useState<AutorProps>();
    const [data, setData] = useState({ idProposta: '', tipo: '', textoArtigo: '', textoProposta: '', textoJustificativa: '' });
    const [emendaTipoID, setEmendaTipoID] = useState(0);

    const idProposta = params.idProposta;

    useEffect(() => {
        const loadData = async () => {
            try {
                const responseAcao = await get(`${API}/acao/emenda/id`);
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
            idProposta: idProposta,
            tipo: acao ? acao.tipos[emendaTipoID].titulo : ''
        });
    }, [acao, emendaTipoID]);


    const sendData = async () => {
        try {
            const response = await post(`${API}/acao/tipo=emenda`, 'application/json', JSON.stringify(data));

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

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (data.textoArtigo === "") {
            return ("Digite o artigo!");
        }
        else if (data.textoProposta === "") {
            return ("Digite o texto para a proposta!");
        }
        else if (data.textoJustificativa === "") {
            return ("Digite o texto para a justificativa!");
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
                title="Publicar essa Emenda?"
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
            <div className="pageNovaAcaoEmenda">
                <div className="titulo">
                    <h1>Nova Emenda De Proposta</h1>
                </div>

                <div className="autor">
                    <p id="label">Deputado:</p>
                    <ButtonPessoa user={autor} />
                </div>

                <div className="info">
                    <CardInfo
                        titulo={`Emenda ${capitalize(acao.tipos[emendaTipoID].titulo)}:`}
                        descricao={acao.tipos[emendaTipoID].descricao}
                    />
                </div>

                <div className="selectbox">
                    <p>Selecione o tipo:</p>

                    <select onChange={(e) => { setEmendaTipoID(parseInt(e.target.value)) }}>
                        {acao.tipos.map((option) => (
                            <option key={option.id} value={option.id}>
                                {capitalize(option.titulo)}
                            </option>
                        ))}
                    </select>
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <label className="inputLabel">
                        <p>Artigo:</p>

                        <input
                            type="text"
                            className="inputText"
                            placeholder="Digite o artigo"
                            onChange={(e) => setData({ ...data, textoArtigo: e.target.value })}
                            maxLength={64}
                        />
                    </label>

                    <label className="inputLabel">
                        <p>Proposta:</p>

                        <textarea
                            className="inputText"
                            placeholder="Digite o texto da proposta aqui..."
                            onChange={(e) => setData({ ...data, textoProposta: e.target.value.replace(/\r?\n/g, "\n") })}
                        />
                    </label>

                    <label className="inputLabel">
                        <p>Justificativa:</p>

                        <textarea
                            className="inputText"
                            placeholder="Digite o texto da justificativa aqui..."
                            onChange={(e) => setData({ ...data, textoJustificativa: e.target.value.replace(/\r?\n/g, "\n") })}
                        />
                    </label>


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
            <div className="pageNovaAcaoEmenda">
                <ErrorPage icon="failed" title="404" text="Página não encontrada!" />
            </div>
        )
    }
}
