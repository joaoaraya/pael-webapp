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
import ActionHeader from '@/components/session/ActionHeader';
import Search from '@/components/input/Search';


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
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [errorStatus, setErrorStatus] = useState(0);
    const [allAcoes, setAllAcoes] = useState<AcoesProps>([]); // Todos as ações recebidas da API (Backup) 
    const [acoes, setAcoes] = useState<AcoesProps>([]);// Lista final de ações no front-end
    const { get } = useAPI();

    const statusAtual = params.statusAtual;

    /* Filtrar descrição dos documentos pela barra de pesquisa */
    const search = (text: string) => {
        const acoesFilter = allAcoes.filter((acao) => {
            // Quando não encotrar resultado mostrar um objeto vazio
            const { dataDeAtualizacao, autor } = acao || {};

            const searchText = text.toLowerCase();
            // Verificar se cada propriedade não é null
            const acaoDataDeAtualizacao = dataDeAtualizacao ? dataDeAtualizacao : '';
            const acaoAutor = autor.nome ? autor.nome.toLocaleLowerCase() : '';

            return (
                acaoDataDeAtualizacao.includes(searchText) ||
                acaoAutor.includes(searchText)
            );
        });

        setAcoes(acoesFilter);
    };

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/acoes/status=${statusAtual}`);
                setAcoes(response.data);
                setAllAcoes(response.data);
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

    if (statusAtual) {
        switch (statusAtual) {
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

            {statusAtual === "concluido" ? (
                <>
                    <ActionHeader>
                        <Search placeholderText="Procure por autor, dia, nº do mês ou ano..." getInputText={search} />
                    </ActionHeader>

                    {!acoes.length && (<ErrorPage icon="info" title="Vazio" text="Nenhuma ação concluída!" />)}
                </>
            ) : (
                <>
                    {!acoes.length && (<ErrorPage icon="success" title="Tudo OK!" text="Nenhuma ação pendente!" />)}
                </>
            )}

            <ListPostsAcao posts={acoes} />
        </>
    )
}
