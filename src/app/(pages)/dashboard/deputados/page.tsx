'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';

import MainHeader from '@/components/session/MainHeader';
import Search from '@/components/session/Search';
import ListPessoas from '@/components/session/ListPessoas';
import OpenModal from '@/components/button/OpenModal';
import ModalFiltros from '@/components/modal/ModalFiltros';
import Icon from '@/components/icon/Icon';


type PessoasProps = {
    nome: string;
    cim: number;
    loja: string;
    lojaNumero: number;
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
}[];


export default function PageDeputados() {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [allUsers, setAllUsers] = useState<PessoasProps>([]);
    const [filtredUsers, setFiltredUsers] = useState<PessoasProps>([]);
    const [users, setUsers] = useState<PessoasProps>([]);
    const [orderUsersBy, setOrderUsersBy] = useState('nome');
    const { get } = useAPI();

    /* Filtrar usuários pelas opções */
    const filter = (ordenarPor: string, exibir: string) => {
        let ordenedUsers = [...allUsers];

        // Ordenar os usuários de acordo com o critério selecionado
        if (ordenarPor === 'nome' || ordenarPor === 'cim' || ordenarPor === 'loja' || ordenarPor === 'lojaNumero' || ordenarPor === 'cargo' || ordenarPor === 'situacao') {
            ordenedUsers.sort((a, b) => {
                if (a[ordenarPor] < b[ordenarPor]) return -1;
                if (a[ordenarPor] > b[ordenarPor]) return 1;
                return 0;
            });
        }

        let showOnlyUsers = ordenedUsers;

        switch (exibir) {
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

        setOrderUsersBy(ordenarPor); // Texto em destaque da lista
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
                // Se der erro voltar para a pagina de login
                console.error('Error:', error);
                Router.push('/');
            }
        }

        loadUserData();
    }, []);


    return (
        <>
            {isLoading ? (<></>) : (
                <>
                    <MainHeader titulo="Deputados">
                        <Link href='/new/deputado'>
                            <button className="btnPrimary btnFloat">
                                <p>Novo Deputado</p>
                            </button>
                        </Link>
                    </MainHeader>

                    <Search placeholderText="Procure por nome, cim, loja ou cargo..." getInputText={search} />

                    <OpenModal
                        tagType="button"
                        className="btnSecondary btnFiltro"
                        modalTitle="Filtros"
                        modalContent={<ModalFiltros getOptions={filter} />}
                    >
                        <Icon nome="options" /><p>Filtros</p>
                    </OpenModal>

                    <ListPessoas users={users} headerTextSelected={orderUsersBy} />
                </>
            )}
        </>
    )
}