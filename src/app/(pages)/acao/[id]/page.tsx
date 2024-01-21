'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import { capitalize } from '@/functions/visual';

import ButtonPessoa from '@/components/button/ButtonPessoa';
import SessionProposta from '@/components/pageAcao/SessionProposta';
import SessionEmenda from '@/components/pageAcao/SessionEmenda';
import SessionLicenca from '@/components/pageAcao/SessionLicenca';
import SessionRenuncia from '@/components/pageAcao/SessionRenuncia';
import ButtonsAcoes from '@/components/pageAcao/ButtonsAcoes';

import './style.scss';
import Link from 'next/link';


type PageProps = {
    id: string;
}

type AcaoProps = {
    id: string;
    ativo: boolean;
    tipo: string;
    statusAtual: string;
    statusFinal: string;
    cimAutor: string;
    dataDeCriacao: string;
    dataDeAtualizacao: string;
    titulo: string;

    conteudoProposta?: {
        textoProposta: string;
        alteracoes: string;
        info: {
            titulo: string;
            descricao: string;
        };
        assinaturasNecessarias: number;

        assinaturas?: {
            cim: string;
            nome: string;
        }[];

        comissoesEncaminhadas?: {
            id: string;
            nome: string;
            parecer: string;
        }[];

        emendasVinculadas?: {
            id: string;
            ativo: boolean;
            statusFinal: string;
        }[];

        plenarioVotos?: {
            aFavor: number;
            contra: number;
            abstencao: number
        };

        anexos?: {
            titulo: string;
            nomeArquivo: string;
        }[];
    };

    conteudoEmenda?: {
        idPropostaVinculada: string;
        textoArtigo: string;
        textoProposta: string;
        textoJustificativa: string;
        alteracoes: string;
        info: {
            titulo: string;
            descricao: string;
        };

        comissoesEncaminhadas?: {
            id: string;
            nome: string;
            parecer: string;
        }[];

        plenarioVotos?: {
            aFavor: number;
            contra: number;
            abstencao: number;
        };
    };

    conteudoLicenca?: {
        motivo: string;
        diasAfastamento: number;
    };

    conteudoRenuncia?: {
        textoFormal: string;
    }
}

type AutorProps = {
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
    cargo: string;
    ativo: boolean;
    situacao: string;
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


export default function PageAcao({ params }: { params: PageProps }) {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [acao, setAcao] = useState<AcaoProps>();
    const [autor, setAutor] = useState<AutorProps>();
    const { get } = useAPI();

    useEffect(() => {
        const loadData = async () => {
            try {
                const responseAcao = await get(`${API}/acao/${params.id}`);
                const responseAutor = await get(`${API}/user/${responseAcao.data.cimAutor}`);

                setAcao(responseAcao.data);
                setAutor(responseAutor.data);

                setIsLoading(false);
            }
            catch (error: any) {
                console.error('Error:', error);

                // Se for erro de autenticação:
                // FAZER!!
                //Router.push('/');
                setIsLoading(false);
            }
        }

        loadData();
    }, []);


    if (isLoading) {
        return (<>Carregando...</>)
    }

    if (acao && autor) {
        return (
            <div className="pageAcao">
                <div className="titulo">
                    <h1>{capitalize(acao.titulo)}</h1>
                </div>

                <div className="autor">
                    <p id="label">Deputado:</p>
                    <ButtonPessoa user={autor} />
                </div>

                <div className="sessao">
                    {acao.tipo === "proposta" && (<SessionProposta acao={acao} />)}
                    {acao.tipo === "emenda" && (<SessionEmenda acao={acao} />)}
                    {acao.tipo === "licenca" && (<SessionLicenca acao={acao} />)}
                    {acao.tipo === "renuncia" && (<SessionRenuncia acao={acao} />)}
                </div>

                <div className="botoes">
                    <ButtonsAcoes autor={autor.cim} acao={acao} />

                    <Link href="/dashboard" id="botaoVoltar">
                        <button className="btnSecondary">
                            <p>Voltar</p>
                        </button>
                    </Link>
                </div>
            </div>
        )
    }

    return (<>Você não tem permição para ver essa ação...</>)
}
