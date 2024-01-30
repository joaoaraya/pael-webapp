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


export default function PageDashboard() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [acoes, setAcoes] = useState<AcoesProps>([]);
    const { get } = useAPI();

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/acoes/status=todos`);
                setAcoes(response.data);
                setIsLoading(false);
            }
            catch (error: any) {
                // Se der erro voltar para a pagina de login
                console.error('Error:', error);
                router.push('/');
            }
        }

        loadData();
    }, []);


    if (isLoading) {
        return (<LoadingPage />)
    }

    return (
        <>
            <MainHeader title="Dashboard">
                <OpenModal
                    tagType="button"
                    className="btnPrimary btnFloat"
                    modalTitle="Nova Ação"
                    modalContent={<ModalNovaAcao />}
                >
                    <p>Nova Ação</p>
                </OpenModal>
            </MainHeader>

            {!acoes.length && (<ErrorPage icon="success" title="Tudo OK" text="Nenhuma ação pendente!" />)}

            <ListPostsAcao posts={acoes} />
        </>
    )
}
