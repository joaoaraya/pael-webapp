'use client';

import './style.scss';

type CardPostAcaoProps = {
    tipo: string;
    statusAtual: string;
}


export default function CardAcaoSteps(props: CardPostAcaoProps) {
    const acao = props;


    /* Detalhes dos status atual de cadao tipo de ação */
    const statusDetalhado = {
        proposta: [
            { descricao: "Aguardando análise" },
            { descricao: "Obtendo assinaturas" },
            { descricao: "Aguardando parecer da comissão" },
            { descricao: "Votação pendente no plenário" },
            { descricao: "Concluído" }
        ],
        emenda: [
            { descricao: "Aguardando análise" },
            { descricao: "Aguardando parecer da comissão" },
            { descricao: "Votação pendente no plenário" },
            { descricao: "Concluído" }
        ],
        pedido: [
            { descricao: "Aguardando deferimento" },
            { descricao: "Concluído" }
        ]
    }


    /* Qual os detalhes da ação */
    const statusAcao = acao.tipo === "proposta" ?
        statusDetalhado.proposta : acao.tipo === "emenda" ?
            statusDetalhado.emenda : statusDetalhado.pedido;


    /* Numeração dos status atuais */
    let stepAtual = 0;

    if (acao.tipo === "proposta") {
        if (acao.statusAtual === "pauta") { stepAtual = 1 }
        if (acao.statusAtual === "comissao") { stepAtual = 2 }
        if (acao.statusAtual === "plenario") { stepAtual = 3 }
        if (acao.statusAtual === "concluido") { stepAtual = 4 }
    }
    if (acao.tipo === "emenda") {
        if (acao.statusAtual === "comissao") { stepAtual = 1 }
        if (acao.statusAtual === "plenario") { stepAtual = 2 }
        if (acao.statusAtual === "concluido") { stepAtual = 3 }
    }
    else {
        if (acao.statusAtual === "concluido") { stepAtual = 1 }
    }

    const statusAtual = statusAcao[stepAtual] || {}


    // Se tiver ajustes pendentes com o Autor
    if (acao.statusAtual === "autor") {
        statusAtual.descricao = "Ajustes pendentes";
    }


    return (
        <div className={`cardAcaoSteps postTipo-${acao.tipo}`}>
            <div id="statusProgresso">
                {statusAcao.map((status, index) => (
                    <div
                        key={index}
                        id={`progresso-${index}`}
                        className={index <= stepAtual ? "stepAprovado" : ""}
                    />
                ))}
            </div>

            <p id="descricaoDoStatus">{statusAtual.descricao}...</p>
        </div >
    )
}