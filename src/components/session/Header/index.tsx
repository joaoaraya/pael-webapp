'use client'

import React, { useEffect } from 'react'
import ButtonLogo from '@/components/button/ButtonLogo'
import ButtonPerfil from '@/components/button/ButtonPerfil'
import OpenSidebar from '@/components/button/OpenSidebar'
import Navigation from '@/components/nav/Navigation'
import Icon from '@/components/icon/Icon'

import './style.scss'

type PerfilProps = {
    nome: string;
    cim: number;
    loja: string;
    lojaNumero: number;
    cargo: string;
    situacao: boolean;
    fotoURL: string;
}

// Banco de Dados Temporario
const dbPerfil = {
    nome: 'João Ferrari Duck Dummond Andrade de Oliveira',
    cim: 1234,
    loja: 'Oriente Dourado',
    lojaNumero: 9876,
    cargo: 'Presidente',
    situacao: true,
    fotoURL: 'https://img.freepik.com/fotos-gratis/envelhecido-homem-sorridente-com-olhos-fechados_23-2148036535.jpg?w=2000',
}

export default function Header() {
    const [perfil, setPerfil] = React.useState<PerfilProps>(dbPerfil) // Inicia com um Objecto base e dizendo quais os Types dos dados

    useEffect(() => {
        // Colocar promisses aqui:

        setPerfil(dbPerfil)
    }, [])

    return (
        <header>
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
                <ButtonPerfil
                    nome={perfil.nome}
                    cim={perfil.cim}
                    loja={perfil.loja}
                    lojaNumero={perfil.lojaNumero}
                    cargo={perfil.cargo}
                    situacao={perfil.situacao}
                    fotoURL={perfil.fotoURL}
                />
            </div>
        </header>
    )
}
