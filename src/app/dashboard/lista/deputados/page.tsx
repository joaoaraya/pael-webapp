'use client';

import MainHeader from '@/components/session/MainHeader';
import Search from '@/components/session/Search';
import ListPessoas from '@/components/session/ListPessoas';
import Link from 'next/link';

import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { API } from '@/functions/urls';

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
    const [pessoas, setPessoas] = useState<PessoasProps>([]);

    /* Ler dados de login nos cookies */
    function readCookie(cookieName: string) {
        const [cookies] = useCookies([cookieName]);
        // Se o cookie não existir retornar null
        return cookies[cookieName] || null;
    }
    const token = readCookie('token');

    /* Get API data */
    const getUserData = async () => {
        if (token) {
            try {
                const response = await axios.get(`${API}/users`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPessoas(response.data);
            }
            catch (error) {
                const message = "Erro ao buscar dados do usuário";
                console.error(message, ":", error);
                throw new Error(message);
            }
        }
        else {
            const message = "ID ou Token ausente";
            console.error(message);
            throw new Error(message);
        }
    }

    useEffect(() => {
        const loadUserData = async () => {
            try {
                await getUserData();
                setIsLoading(false);
            }
            catch (error) {
                // Se der erro voltar para o inicio (Login)
                console.error('Erro ao carregar dados do usuário:', error);
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
                        <Link href='/dashboard/congresspersons/create'>
                            <button className="btnPrimary btnFloat">
                                <p>Novo Deputado</p>
                            </button>
                        </Link>
                    </MainHeader>

                    {/*<Search placeholderText="Procure por nome, cim, loja ou cargo..." showFilterButton={true} />*/}

                    <ListPessoas users={pessoas} />
                </>
            )}
        </>
    )
}