'use client';

import { ReactNode } from 'react';
import HeaderLogoOnly from '@/components/session/HeaderLogoOnly';
import './style.scss';

type Props = {
    children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
    return (
        <div className="container">
            <HeaderLogoOnly />
            <main>
                {children}
            </main>
        </div>
    )
}
