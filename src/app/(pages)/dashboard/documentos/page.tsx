'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';

import MainHeader from '@/components/session/MainHeader';
import ActionHeader from '@/components/session/ActionHeader';
import Search from '@/components/input/Search';
import ListDocsOficiais from '@/components/session/ListDocsOficiais';
import LoadingPage from '@/components/session/LoadingPage';


type DocsProps = {
    id: string;
    nome: string;
    nomeArquivo: string;
    cimAutor: string;
}[];


export default function PageDocumentos() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [allDocs, setAllDocs] = useState<DocsProps>([]); // Todos os grupos de usuários recebidos da API (Backup) 
    const [docs, setDocs] = useState<DocsProps>([]); // Lista final de grupos de usuarios no front-end
    const { get } = useAPI();

    /* Filtrar descrição dos documentos pela barra de pesquisa */
    const search = (text: string) => {
        const docsFilter = allDocs.filter((doc) => {
            // Quando não encotrar resultado mostrar um objeto vazio
            const { nome } = doc || {};

            const searchText = text.toLowerCase();
            // Verificar se cada propriedade não é null
            const userNome = nome ? nome.toLowerCase() : '';

            return (userNome.includes(searchText));
        });

        setDocs(docsFilter);
    };

    useEffect(() => {
        const loadDocsData = async () => {
            try {
                const response = await get(`${API}/docs`);

                setAllDocs(response.data);
                setDocs(response.data);

                setIsLoading(false);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        loadDocsData();
    }, []);


    if (isLoading) {
        return (<LoadingPage />)
    }

    return (
        <>
            <MainHeader title="Documentos Oficiais">
                <Link href='/new/documento'>
                    <button className="btnPrimary btnFloat">
                        <p>Novo Documento</p>
                    </button>
                </Link>
            </MainHeader>

            <ActionHeader>
                <Search placeholderText="Procure por documentos..." getInputText={search} />
            </ActionHeader>

            <ListDocsOficiais docs={docs} />
        </>
    )
}
