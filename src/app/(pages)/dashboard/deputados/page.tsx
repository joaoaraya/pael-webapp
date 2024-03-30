'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';

import MainHeader from '@/components/session/MainHeader';
import ActionHeader from '@/components/session/ActionHeader';
import Search from '@/components/input/Search';
import ListPessoas from '@/components/session/ListPessoas';
import OpenModal from '@/components/button/OpenModal';
import ModalFiltros from '@/components/modal/ModalFiltros';
import Icon from '@/components/icon/Icon';
import LoadingPage from '@/components/session/LoadingPage';


type PessoasProps = {
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
    cargo: string;
    ativo: boolean;
    situacao: string;
    situacaoData: string;
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
}[];


export default function PageDeputados() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [userAdmin, setUserAdmin] = useState(false);
    const [allUsers, setAllUsers] = useState<PessoasProps>([]); // Todos os usuários recebidos da API (Backup) 
    const [filtredUsers, setFiltredUsers] = useState<PessoasProps>([]); // Todos os usuarios mas com filtro aplicado 
    const [users, setUsers] = useState<PessoasProps>([]); // Lista final de usuarios no front-end
    const [orderUsersBy, setOrderUsersBy] = useState('nome');
    const { get } = useAPI();


    /* Filtrar usuários pelas opções */
    const filter = (orderBy: string, showOnly: string) => {
        let ordenedUsers = [...allUsers];

        // Ordenar os usuários de acordo com o critério selecionado (A-Z ou 0-9..)
        if (orderBy === 'nome' || orderBy === 'cim' || orderBy === 'loja' || orderBy === 'lojaNumero' || orderBy === 'cargo' || orderBy === 'situacao') {
            ordenedUsers.sort((a, b) => {
                if (a[orderBy] < b[orderBy]) return -1;
                if (a[orderBy] > b[orderBy]) return 1;
                return 0;
            });
        }

        let showOnlyUsers = ordenedUsers;

        switch (showOnly) {
            case 'ativos':
                showOnlyUsers = ordenedUsers.filter(user => user.ativo)
                break;
            case 'inativos':
                showOnlyUsers = ordenedUsers.filter(user => !user.ativo)
                break;
            case 'comCargos':
                showOnlyUsers = ordenedUsers.filter(user => user.cargo)
                break;
            case 'semCargos':
                showOnlyUsers = ordenedUsers.filter(user => !user.cargo)
                break;
        }

        setFiltredUsers(showOnlyUsers);
        setUsers(showOnlyUsers);
        setOrderUsersBy(orderBy); // Texto que fica em destaque na header
    }

    /* Filtrar usuários pela barra de pesquisa */
    const search = (text: string) => {
        const usersFilter = filtredUsers.filter((user) => {
            // Quando não encotrar resultado mostrar um objeto vazio
            const { nome, cim, loja, lojaNumero, cargo } = user || {};

            const searchText = text.toLowerCase();
            // Verificar se cada propriedade não é null
            const userNome = nome ? nome.toLowerCase() : '';
            const userCim = cim ? cim.toString() : '';
            const userLoja = loja ? loja.toLowerCase() : '';
            const userLojaNumero = lojaNumero ? lojaNumero.toString() : '';
            const userCargo = cargo ? cargo.toLowerCase() : '';

            return (
                userNome.includes(searchText) ||
                userCim.includes(searchText) ||
                userLoja.includes(searchText) ||
                userLojaNumero.includes(searchText) ||
                userCargo.includes(searchText)
            );
        });

        setUsers(usersFilter);
    };

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await get(`${API}/users`);

                setAllUsers(response.data);
                setFiltredUsers(response.data);
                setUsers(response.data);

                setIsLoading(false);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        const checkUserIsAdmin = async () => {
            try {
                const responsePresidente = await get(`${API}/check/user/presidente`);
                const responseSecretarioVice = await get(`${API}/check/user/secretario-vice`);

                if (responsePresidente.data === true) {
                    setUserAdmin(true);
                }
                else if (responseSecretarioVice.data === true) {
                    setUserAdmin(true);
                }
                else {
                    setUserAdmin(false);
                }
            }
            catch (error: any) {
                console.error('Error:', error);
            }
        };

        loadUserData();
        checkUserIsAdmin();
    }, []);


    if (isLoading) {
        return (<LoadingPage />)
    }

    return (
        <>
            <MainHeader title="Deputados">
                {userAdmin && (
                    <Link href='/new/deputado'>
                        <button className="btnPrimary btnFloat">
                            <p>Novo Deputado</p>
                        </button>
                    </Link>
                )}
            </MainHeader>

            <ActionHeader>
                <Search placeholderText="Procure por nome, cim, loja ou cargo..." getInputText={search} />

                <OpenModal
                    tagType="button"
                    className="btnSecondary btnWithIcon"
                    modalTitle="Filtros"
                    modalContent={<ModalFiltros getOptions={filter} />}
                >
                    <Icon nome="options" /><p>Filtros</p>
                </OpenModal>
            </ActionHeader>

            <ListPessoas users={users} headerTextSelected={orderUsersBy} admin={userAdmin} />
        </>
    )
}