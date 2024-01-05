'use client'

import { ReactNode } from 'react'
import NavMenu from '@/components/nav/NavMenu'
import Header from '@/components/session/Header'

import './style.scss'

type Props = {
    children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
	return (
		<div className="container">
			<Header />
			<NavMenu />
			<main>
				{children}
			</main>
		</div>
	)
}
