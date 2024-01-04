import Icon from '@/components/icon/Icon'
import './style.scss'

type CardInfoProps = {
    titulo: string;
    descricao?: string;
    icone?: string;
    cor?: string;
}

export default function CardInfo({ icone = 'info', cor = 'alternative', ...props }: CardInfoProps) {

	return (
		<div className={`cardInfo cardColor-${cor}`}>
			<div className="icone">
				<Icon nome={icone} />
			</div>

			<div className="texto">
				<p id="titulo">{props.titulo}</p>
				<p id="descricao">{props.descricao}</p>
			</div>
		</div>
	)
}
