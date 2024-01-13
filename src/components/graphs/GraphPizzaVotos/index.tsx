import React, { useState, useEffect } from 'react';
import './style.scss';


type GraphPizzaVotosProps = {
    aFavor: number;
    contra: number;
}


export default function GraphPizzaVotos(props: GraphPizzaVotosProps) {
    const [aFavorCount, setAFavorCount] = useState(0);
    const [contraCount, setContraCount] = useState(0);

    const color = {
        green: "var(--body-bg-ok)",
        red: "var(--body-bg-attention)",
        gray: "var(--body-font-light-2)"
    }

    useEffect(() => {
        const interval = setInterval(() => {
            // Atualiza os valores progressivamente até atingirem os valores finais
            if (aFavorCount < props.aFavor) {
                setAFavorCount(aFavorCount + 1);
            }
            if (contraCount < props.contra) {
                setContraCount(contraCount + 1);
            }
        }, 25); // Tempo

        return () => clearInterval(interval); // Recomeça contagem da animação ao fechar

    }, [aFavorCount, contraCount, props.aFavor, props.contra]);


    return (
        <div className="graphPizzaVotos">
            <div className="graphic" style={{
                backgroundImage: `conic-gradient(
                        ${color.green} ${aFavorCount}%, ${color.green} ${aFavorCount}%, 
                        ${color.red} ${aFavorCount}%, ${color.red} ${aFavorCount + contraCount}%, 
                        ${color.gray} ${aFavorCount + contraCount}%
                    )`,
            }} />
        </div>
    )
}
