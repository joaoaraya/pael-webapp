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
    statusAtual: string;
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


export default function PageAcoes({ params }: { params: PageProps }) {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(0);
    const [acoes, setAcoes] = useState<AcoesProps>([]);
    const { get } = useAPI();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/acoes/status=${params.statusAtual}`);
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


    let pageTitle = "";

    if (params.statusAtual) {
        switch (params.statusAtual) {
            case "redacao": pageTitle = "Ações em Redação"; break;
            case "pauta": pageTitle = "Ações em Pauta"; break;
            case "comissao": pageTitle = "Ações em Comissão"; break;
            case "plenario": pageTitle = "Ações em Plenário"; break;
            case "concluido": pageTitle = "Ações Concluídas"; break;
        }
    }


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
            <MainHeader title={pageTitle}>
                <OpenModal
                    tagType="button"
                    className="btnPrimary btnFloat"
                    modalTitle="Nova Ação"
                    modalContent={<ModalNovaAcao />}
                >
                    <p>Nova Ação</p>
                </OpenModal>
            </MainHeader>

            {!acoes.length && (<ErrorPage icon="sucess" title="Tudo OK" text="Nenhuma ação pendente!" />)}

            <ListPostsAcao posts={acoes} />
        </>
    )
}
