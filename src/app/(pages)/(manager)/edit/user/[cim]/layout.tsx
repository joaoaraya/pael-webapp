'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import LoadingPage from '@/components/session/LoadingPage';
import NavConta from '@/components/nav/NavConta';
import ErrorPage from '@/components/session/ErrorPage';
import './style.scss';


type PageProps = {
    cim: string;
}

type UserProps = {
    nome: string;
    cim: string;
}


export default function PageEditUser({ children, params }: { children: ReactNode, params: PageProps }) {
    const [isLoading, setIsLoading] = useState(true);
    const { get } = useAPI();
    const [userData, setUserData] = useState<UserProps>();
    const [userPresidente, setUserPresidente] = useState(false);
    const [userAutor, setUserAutor] = useState(false);


    useEffect(() => {
        const checkUserIsPresidente = async () => {
            try {
                const response = await get(`${API}/check/user/presidente`);
                setUserPresidente(response.data);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        const checkUserIsAutor = async (idCIM: string) => {
            try {
                const response = await get(`${API}/check/user/autor/cim=${idCIM}`);
                setUserAutor(response.data);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        const loadUserData = async () => {
            try {
                const response = await get(`${API}/user/${params.cim}`);

                setUserData(response.data);
                checkUserIsAutor(response.data.cim);

                setIsLoading(false);
            }
            catch (error: any) {
                // Ações de erro no hook de API
                setIsLoading(false);
            }
        }

        checkUserIsPresidente();
        loadUserData();
    }, []);


    if (isLoading) {
        return (<LoadingPage />)
    }

    if (userData) {
        return (
            <div className="pageEditUser">
                <div className="pageContainer">
                    <NavConta isPresidente={userPresidente} isAutor={userAutor} user={userData} />

                    {children}
                </div>
            </div>
        )
    }

    return (
        <div className="pageEditUser">
            <ErrorPage icon="failed" title="404" text="Usuário não encontrado!" />
        </div>
    )
}
