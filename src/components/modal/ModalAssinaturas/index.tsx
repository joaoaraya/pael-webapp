import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';

import './style.scss';


type AssinaturasProps = {
    assinaturas: {
        nome: string;
        cim: string;
    }[];
}


export default function ModalAssinaturas(props: AssinaturasProps) {
    return (
        <div className="modalAssinaturas">
            {props.assinaturas.map((deputado, index) => (
                <div className="deputado" key={index}>

                    <img
                        className="profilePicture"
                        src={`${API}/user/${deputado.cim}/picture/small`}
                        alt=""
                    />

                    <p id="nomeDeputado">{capitalize(deputado.nome)}</p>
                </div>
            ))}
        </div>
    )
}