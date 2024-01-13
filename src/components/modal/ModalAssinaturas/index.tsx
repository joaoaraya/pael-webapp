import { useState } from 'react';
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

    const [withoutPicture, setWithoutPicture] = useState<string[]>([]);
    const onImageLoadError = (cim: string) => {
        setWithoutPicture((prevWithoutPicture) => [...prevWithoutPicture, cim]);
    };

    return (
        <div className="modalAssinaturas">
            {props.assinaturas.map((deputado, index) => (
                <div className="deputado" key={index}>

                    <img
                        id="fotoURL"
                        src={`${API}/user/${deputado.cim}/picture/small`}
                        alt=""
                        onError={() => onImageLoadError(deputado.cim)}
                        className={withoutPicture.includes(deputado.cim) ? 'defaultPicture' : ''}
                    />

                    <p id="nomeDeputado">{capitalize(deputado.nome)}</p>
                </div>
            ))}
        </div>
    )
}