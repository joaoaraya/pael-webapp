'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';

import MainHeader from '@/components/session/MainHeader';
import OpenModal from '@/components/button/OpenModal';
import ModalNovaAcao from '@/components/modal/ModalNovaAcao';
import ListPostsAcao from '@/components/session/ListPostsAcao';


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
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
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
                // Se der erro voltar para a pagina de login
                console.error('Error:', error);
                Router.push('/');
            }
        }

        loadData();
    }, []);

    const pageTitle = apiFilter === "to" ? "Tarefas" : "Acões";


    if (isLoading) {
        return (<>Carregando</>)
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

            {!acoes.length && (<p>Nenhuma ação</p>)}

            <ListPostsAcao posts={acoes} />
        </>
    )
}
