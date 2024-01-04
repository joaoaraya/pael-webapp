import { useState, useEffect } from 'react'
import Icon from '@/components/icon/Icon'
import Link from 'next/link'

import './style.scss'

type NavigationOption = {
    icon: string;
    title: string;
    path: string;
};

type NavigationGroup = {
    title: string;
    options: NavigationOption[];
};

const navigation: NavigationGroup[] = [
	{
		title: 'Minhas',
		options: [
			{
				icon: 'dashboard',
				title: 'Tarefas',
				path: '/dashboard/minhas/tarefas',
			},
			{
				icon: 'dashboard',
				title: 'Ações',
				path: '/dashboard/minhas/acoes',
			}
		]
	},
	{
		title: 'Ações em',
		options: [
			{
				icon: 'dashboard',
				title: 'Redação',
				path: '/dashboard/acao/redacao',
			},
			{
				icon: 'dashboard',
				title: 'Pauta',
				path: '/dashboard/acao/pauta',
			},
			{
				icon: 'dashboard',
				title: 'Comissão',
				path: '/dashboard/acao/comissao',
			},
			{
				icon: 'dashboard',
				title: 'Plenário',
				path: '/dashboard/acao/plenario',
			},
			{
				icon: 'dashboard',
				title: 'Concluídas',
				path: '/dashboard/acao/concluida',
			},
		]
	},
	{
		title: 'Lista de',
		options: [
			{
				icon: 'people',
				title: 'Deputados',
				path: '/dashboard/lista/deputados',
			},
			{
				icon: 'group',
				title: 'Comissões',
				path: '/dashboard/lista/comissoes',
			},
			{
				icon: 'none',
				title: 'Sair',
				path: '/',
			},
		]
	}
]

export default function Navigation() {
	const [selectedPage, setSelectedPage] = useState<string>('')

	useEffect(() => {
		// Acessa o caminho atual diretamente do window.location
		const currentPath = window.location.pathname

		// Encontra a opção de navegação correspondente ao caminho atual
		const matchingOption = navigation
			.flatMap((group) => group.options)
			.find((option) => option.path === currentPath)

		if (matchingOption) {
			setSelectedPage(matchingOption.title)
		}
	}, [])

	return (
		<div className="navigation">
			{navigation.map((group, groupIndex) => (
				<div className="groups" key={groupIndex}>

					<p className="groupTitle">{group.title}</p>

					{group.options.map((option, optionIndex) => (
						<Link
							className="linkButton"
							href={option.path}
							key={optionIndex}
						>
							<button
								className={selectedPage === option.title ? 'active' : ''}
								onClick={() => setSelectedPage(option.title)}
							>
								<Icon nome={option.icon} />
								<p>{option.title}</p>
							</button>
						</Link>
					))}
				</div>
			))}
		</div>
	)
}
