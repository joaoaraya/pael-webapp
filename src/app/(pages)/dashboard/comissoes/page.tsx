'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';

import MainHeader from '@/components/session/MainHeader';
import ActionHeader from '@/components/session/ActionHeader';
import Search from '@/components/input/Search';
import ListGruposPessoas from '@/components/session/ListGruposPessoas';


type GrupoPessoasProps = {
    id: number;
    nome: string;
    membros: {
        cim: string;
        nome: string;
        presidente: boolean;
    }[];
}[];


export default function PageComissoes() {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userAdmin, setUserAdmin] = useState(false);
    const [allUserGroups, setAllUserGroups] = useState<GrupoPessoasProps>([]); // Todos os grupos de usuários recebidos da API (Backup) 
    const [userGroups, setUserGroups] = useState<GrupoPessoasProps>([]); // Lista final de grupos de usuarios no front-end
    const { get } = useAPI();

    /* Filtrar usuários pela barra de pesquisa */
    const search = (text: string) => {
        const groupFilter = allUserGroups.filter((comissao) => {
            // Quando não encotrar resultado mostrar um objeto vazio
            const { nome } = comissao || {};

            const searchText = text.toLowerCase();
            // Verificar se cada propriedade não é null
            const userNome = nome ? nome.toLowerCase() : '';

            return (userNome.includes(searchText));
        });

        setUserGroups(groupFilter);
    };

    useEffect(() => {
        const loadUserGroupsData = async () => {
            try {
                const response = await get(`${API}/comissoes`);

                setAllUserGroups(response.data);
                setUserGroups(response.data);

                setIsLoading(false);
            }
            catch (error: any) {
                // Se der erro voltar para a pagina de login
                console.error('Error:', error);
                Router.push('/');
            }
        }

        const checkUserIsPresidente = async () => {
            try {
                const response = await get(`${API}/check/user/presidente`);
                setUserAdmin(response.data);
            } catch (error: any) {
                console.error('Error:', error);
            }
        };

        loadUserGroupsData();
        checkUserIsPresidente();
    }, []);


    if (isLoading) {
        return (<></>)
    }

    return (
        <>
            <MainHeader titulo="Comissões">
                {userAdmin && (
                    <Link href='/new/comissao'>
                        <button className="btnPrimary btnFloat">
                            <p>Nova Comissão</p>
                        </button>
                    </Link>
                )}
            </MainHeader>

            <ActionHeader>
                <Search placeholderText="Procure por comissões..." getInputText={search} />
            </ActionHeader>

            <ListGruposPessoas userGroups={userGroups} />
        </>
    )
}
