'use client';

import { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import { useRouter } from 'next/navigation';

import NavMenu from '@/components/nav/NavMenu';
import Header from '@/components/session/Header';
import LoadingPage from '@/components/session/LoadingPage';

import './style.scss';


type Props = {
    children: ReactNode;
};

type PerfilProps = {
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
}


export default function DashboardLayout({ children }: Props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<PerfilProps>();
    const { get } = useAPI();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await get(`${API}/user/me`);

                setUser(response.data);
                setIsLoading(false);
            }
            catch {
                router.push("/");
            }
        }
        loadUserData();
    }, []);


    return (
        <div className="container">
            {isLoading ?
                <main>
                    <LoadingPage />
                </main>
                :
                <>
                    <Header userData={user} />
                    <NavMenu />
                    <main>
                        {children}
                    </main>
                </>
            }
        </div>
    )
}
