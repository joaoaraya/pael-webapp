import Link from 'next/link';
import './style.scss';


type ComissoesProps = {
    emendas?: {
        id: string;
        ativo: boolean;
        statusFinal: string;
    }[];
}


export default function ModalEmendasVinculadas(props: ComissoesProps) {
    if (props.emendas) {

        return (
            <div className="modalEmendasVinculadas">
                {props.emendas.map((emenda, index) => (
                    <Link href={`/acao/${emenda.id}`} target="_blank" key={index}>
                        <div className="emenda">
                            <p>Emenda 0{index + 1}: {emenda.ativo ? 'Em processo...' : 'Concluída'}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}