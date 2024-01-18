'use client';

import { useState, useEffect } from 'react';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';

import ButtonLogo from '@/components/button/ButtonLogo';
import ButtonPerfil from '@/components/button/ButtonPerfil';
import OpenSidebar from '@/components/button/OpenSidebar';
import Navigation from '@/components/nav/Navigation';
import Icon from '@/components/icon/Icon';

import './style.scss';


type PerfilProps = {
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
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
}


export default function Header() {
    const [user, setUser] = useState<PerfilProps>();
    const { get } = useAPI();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await get(`${API}/user/me`);
                setUser(response.data);
            }
            catch (error: any) {
                console.error('Error:', error);
            }
        }
        loadUserData();
    }, []);


    return (
        <header>
            <div className="headerContainer">
                <OpenSidebar
                    tagType="button"
                    className="mobileNavMenu"
                    sidebarContent={<Navigation />}
                >
                    <span className="iconMenu">
                        <Icon nome="menu" />
                    </span>
                </OpenSidebar>

                <ButtonLogo />

                <div className="actions">
                    <ButtonPerfil user={user} />
                </div>
            </div>
        </header>
    )
}
