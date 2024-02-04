'use client';

import { ReactNode } from 'react';
import './style.scss';

type Props = {
    children: ReactNode;
}

export default function PageEditUserOption({ children }: Props) {
    return (
        <div className="pageEditUserOption">
            {children}
        </div>
    );
}
