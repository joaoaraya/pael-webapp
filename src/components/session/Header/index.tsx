'use client';

import ButtonLogo from '@/components/button/ButtonLogo';
import ButtonPerfil from '@/components/button/ButtonPerfil';
import OpenSidebar from '@/components/button/OpenSidebar';
import Navigation from '@/components/nav/Navigation';
import Icon from '@/components/icon/Icon';

import './style.scss';


export default function Header({ userData }: any) {
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
                    <ButtonPerfil user={userData} />
                </div>
            </div>
        </header>
    )
}
