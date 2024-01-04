'use client'

import React, { useEffect } from 'react'
import CardGrupoPessoas from '@/components/card/CardGrupoPessoas'

import './style.scss'

type ListGruposPessoasProps = {
    id: number;
    nome: string;
    participantes: {
        nome: string;
        presidente: boolean;
        fotoURL: string;
    }[];
}[];

// Banco de dados temporario
const dbComissoes: ListGruposPessoasProps = [
	{
		id: 34590,
		nome: 'Comissão de Orçamento e Finanças',
		participantes: [
			{
				nome: 'Mario',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Joao Fernandes Da Silva',
				presidente: true,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Carlo',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Edd',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
		]
	},
	{
		id: 92934,
		nome: 'Comissão de Tecnologia',
		participantes: [
			{
				nome: 'Jef',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Ed',
				presidente: true,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Yan',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Dev',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
			{
				nome: 'Hum',
				presidente: false,
				fotoURL: 'https://img.freepik.com/fotos-gratis/homem-bonito-e-confiante-sorrindo-com-as-maos-cruzadas-no-peito_176420-18743.jpg?w=100'
			},
		]
	}
]

export default function ListGruposPessoas() {
	const [grupos, setGrupos] = React.useState<ListGruposPessoasProps>(dbComissoes) // Inicia com um Objecto base e dizendo quais os Types dos dados

	useEffect(() => {
		setGrupos(dbComissoes)
	}, [])

	return (
		<div className="listGruposPessoas">
			{grupos.map((comissao, index) =>
				<CardGrupoPessoas
					key={index}
					id={comissao.id}
					nome={comissao.nome}
					participantes={comissao.participantes}
				/>
			)}
		</div>
	)
}