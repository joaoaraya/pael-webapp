import Link from 'next/link';
import { API } from '@/functions/urls';
import iconPdf from '@/assets/images/iconPdf.png';

import './style.scss';


type AnexosProps = {
    acao: {
        id: string;
    };
    anexos?: {
        titulo: string;
        nomeArquivo: string;
    }[];
}


export default function ModalAnexos(props: AnexosProps) {
    if (props.anexos) {

        return (
            <div className="modalAnexos">
                {props.anexos.map((doc, index) => (
                    <Link href={`${API}/acao/${props.acao.id}/doc/${doc.nomeArquivo}`} target="_blank" key={index}>
                        <div className="doc">
                            <img src={iconPdf.src} alt="" />
                            <p>{doc.titulo}</p>
                        </div>
                    </Link>
                ))}
            </div>
        )
    }
}