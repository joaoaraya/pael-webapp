import React from 'react'
import './style.scss'

type AssinaturasProps = {
    assinaturas: {
        cim: string;
        nome: string;
    }[];
};

export default function ModalAssinaturas(props: AssinaturasProps) {
    return (
        <div className="modalAssinaturas">
            {props.assinaturas.map((deputado, index) => (
                <div className="deputado" key={index}>
                    <img src="" alt="" />
                    <p id="nomeDeputado">{deputado.nome}</p>
                </div>
            ))}
        </div>
    )
}