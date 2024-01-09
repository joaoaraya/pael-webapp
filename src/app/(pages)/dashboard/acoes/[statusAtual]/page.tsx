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
                // Se der erro voltar para a pagina de login
                console.error('Error:', error);
                Router.push('/');
            }
        }

        loadData();
    }, []);


    let pageTitle = "";

    if (params.statusAtual) {
        switch (params.statusAtual) {
            case "redacao": pageTitle = "em Redação"; break;
            case "pauta": pageTitle = "em Pauta"; break;
            case "comissao": pageTitle = "em Comissão"; break;
            case "plenario": pageTitle = "em Plenário"; break;
            case "concluido": pageTitle = "Concluídas"; break;
        }
    }


    if (isLoading) {
        return (<></>)
    }

    return (
        <>
            <MainHeader titulo={"Ações " + pageTitle}>
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
