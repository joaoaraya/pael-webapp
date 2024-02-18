'use client';

import ButtonLogo from '@/components/button/ButtonLogo';

import './style.scss';

export default function HeaderOnly() {
    return (
        <header className="headerLogoOnly">
            <div className="containerLogoOnly">
                <ButtonLogo />
            </div>
        </header>
    )
}
