'use client';

import { ReactNode } from 'react';
import HeaderLogoOnly from '@/components/session/HeaderLogoOnly';
import './style.scss';

type Props = {
    children: ReactNode;
}

export default function HomeLayout({ children }: Props) {
    return (
        <div className="containerHome">
            <HeaderLogoOnly />
            <main>
                {children}
            </main>
        </div>
    )
}
