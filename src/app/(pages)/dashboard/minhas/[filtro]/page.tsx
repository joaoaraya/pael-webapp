'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';

import MainHeader from '@/components/session/MainHeader';
import OpenModal from '@/components/button/OpenModal';
import ModalNovaAcao from '@/components/modal/ModalNovaAcao';
import ListPostsAcao from '@/components/session/ListPostsAcao';
import ErrorPage from '@/components/session/ErrorPage';
import LoadingPage from '@/components/session/LoadingPage';


type PageProps = {
    filtro: string;
}

type AcoesProps = {
    id: string;
    ativo: boolean;
    tipo: string;
    titulo: string;
    statusAtual: string;
    statusFinal: string;
    dataDeAtualizacao: string;
    autor: {
        cim: string;
        nome: string
    }
}[];


export default function PageMinhasAcoes({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(0);
    const [acoes, setAcoes] = useState<AcoesProps>([]);
    const { get } = useAPI();

    const apiFilter = params.filtro === "tarefas" ?
        "to" : params.filtro === "acoes" ?
            "by" : "";

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/acoes/${apiFilter}=me`);
                setAcoes(response.data);
                setIsLoading(false);
            }
            catch (error: any) {
                // Ações de erro no hook de API
                setErrorStatus(404);
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    const pageTitle = apiFilter === "to" ? "Tarefas" : "Ações";


    if (isLoading) {
        return (<LoadingPage />)
    }

    if (errorStatus === 404) {
        return (
            <div className="pageAcao">
                <ErrorPage icon="failed" title="404" text="Página não encontrada!" />
            </div>
        )
    }

    return (
        <>
            <MainHeader title={"Minhas " + pageTitle} counter={apiFilter === "to" ? (acoes.length > 99 ? 99 : acoes.length) : 0}>
                <OpenModal
                    tagType="button"
                    className="btnPrimary btnFloat"
                    modalTitle="Nova Ação"
                    modalContent={<ModalNovaAcao />}
                >
                    <p>Nova Ação</p>
                </OpenModal>
            </MainHeader>

            {!acoes.length && (
                apiFilter === "to" ?
                    <ErrorPage icon="success" title="Tudo OK" text="Nenhuma ação pendente!" />
                    :
                    <ErrorPage icon="info" title="Vazio" text="Você ainda não criou nenhuma ação!" />
            )}

            <ListPostsAcao posts={acoes} />
        </>
    )
}
