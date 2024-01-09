import React, { useState } from 'react';
import { API } from '@/functions/urls';
import Link from 'next/link';

import './style.scss';
import { capitalize, formatDate } from '@/functions/visual';


type CardPostAcaoProps = {
    post: {
        id: string;
        ativo: boolean;
        tipo: string;
        titulo: string;
        statusAtual: string;
        statusFinal: string;
        dataDeAtualizacao: string;
        autor: {
            cim: string;
            nome: string
        }
    }
}


export default function CardPostAcao(props: CardPostAcaoProps) {
    const acao = props.post;

    const [withoutPicture, setWithoutPicture] = useState(false);
    const onImageLoadError = () => {
        setWithoutPicture(true);
    }

    /* Acentos no título para os tipos de ação */
    const acaoTipo =
        acao.tipo === "proposta" ? "Proposta" :
            acao.tipo === "emenda" ? "Emenda" :
                acao.tipo === "licenca" ? "Licença" :
                    acao.tipo === "renuncia" ? "Renúncia" : "Ação";


    /* Detalhes dos status atual de cadao tipo de ação */
    const statusDetalhado = {
        proposta: [
            { titulo: "Ação do Autor", descricao: "Ajustes pendentes" },
            { titulo: "Ação do Presidente", descricao: "Aguardando análise" },
            { titulo: "Ação dos demais Deputados", descricao: "Obtendo assinaturas" },
            { titulo: "Ação da Comissão", descricao: "Aguardando parecer da comissão" },
            { titulo: "Ação do Presidente", descricao: "Votação pendente no plenário" },
            { titulo: "Ação Concluída", descricao: "Concluído" }
        ],
        emenda: [
            { titulo: "Ação do Autor", descricao: "Ajustes pendentes" },
            { titulo: "Ação do Presidente", descricao: "Aguardando análise" },
            { titulo: "Ação da Comissão", descricao: "Aguardando parecer da comissão" },
            { titulo: "Ação do Presidente", descricao: "Votação pendente no plenário" },
            { titulo: "Ação Concluída", descricao: "Concluído" }
        ],
        pedido: [
            { titulo: "Ação do Presidente", descricao: "Aguardando deferimento" },
            { titulo: "Ação Concluída", descricao: "Concluído" }
        ]
    }


    /* Qual os detalhes da ação */
    const statusAcao = acao.tipo === "proposta" ?
        statusDetalhado.proposta.slice(1) : acao.tipo === "emenda" ?
            statusDetalhado.emenda.slice(1) : statusDetalhado.pedido;


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
    if (acao.tipo === "licenca" || acao.tipo === "renuncia") {
        if (acao.statusAtual === "concluido") { stepAtual = 1 }
    }

    const statusAtual = statusAcao[stepAtual] || {}


    return (
        <Link href={"/acao/" + acao.id}>
            <button className={`cardPostAcao postTipo-${acao.tipo} postAcao-${acao.statusFinal}`}>

                <h1 id="tipo">{acaoTipo}</h1>

                <p id="responsavelPelaAcao">
                    {acao.ativo ? statusAtual.titulo : capitalize(acao.statusFinal)}
                </p>

                <h2 id="titulo">{capitalize(acao.titulo)}</h2>

                {acao.ativo && (
                    <>
                        <div id="statusProgresso">
                            {statusAcao.map((status, index) => (
                                <div
                                    key={index}
                                    id={`progresso-${index}`}
                                    className={index <= stepAtual ? "stepAprovado" : ""}
                                />
                            ))}
                        </div>

                        <p id="descricaoDoStatus">{statusAtual.descricao}</p>
                    </>
                )}

                <div id="postAutor">
                    <img
                        id="fotoURL"
                        src={`${API}/user/${acao.autor.cim}/picture/small`}
                        alt=""
                        onError={onImageLoadError}
                        className={withoutPicture ? 'defaultPicture' : ''}
                    />

                    <p id="autor">
                        Por: <b>{capitalize(acao.autor.nome)}</b>
                    </p>

                    <p id="dataDeAtualizacao">
                        Atualizado: <b>{formatDate(acao.dataDeAtualizacao)}</b>
                    </p>
                </div>
            </button>
        </Link>
    )
}