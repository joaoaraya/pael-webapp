'use client';

import { ReactNode } from 'react';
import './style.scss';

type Props = {
    children: ReactNode;
}

export default function NewPagesLayout({ children }: Props) {
    return (
        <div className="page">
            {children}
        </div>
    )
}
