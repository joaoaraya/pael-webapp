import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './global.scss';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'PAEL GOB-SP',
    description: 'Sistema de gerenciamento da PAEL',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="pt-br" id="root-app">
            <body className={inter.className}>
                {children}
            </body>
        </html>
    )
}