import Link from 'next/link';
import './style.scss';


type PropostaProps = {
    id?: string;
}


export default function ListPropostaVinculada(props: PropostaProps) {
    if (props.id) {

        return (
            <div className="listPropostaVinculada">
                <h1>Emenda da ação:</h1>

                <Link href={`/acao/${props.id}`} target="_blank">
                    <div className="proposta">
                        <p>Proposta ({props.id})</p>
                    </div>
                </Link>
            </div>
        )
    }
}