import { ReactNode } from 'react'
import './style.scss'

type MainHeaderProps = {
    titulo: string;
    children?: ReactNode;
}

export default function MainHeader(props: MainHeaderProps) {
	return (
		<div className="mainHeader">
			<h1 id="pageTitulo">
				{props.titulo}
			</h1>
			{props.children}
		</div>
	)
}