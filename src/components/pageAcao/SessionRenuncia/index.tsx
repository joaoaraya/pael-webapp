'use client';

import { formatDate } from '@/functions/visual';
import CardInfo from '@/components/card/CardInfo';
import TextBoxExpand from '@/components/session/TextBoxExpand';
import './style.scss';


type RenunciaProps = {
    acao: {
        id: string;
        ativo: boolean;
        tipo: string;
        statusAtual: string;
        statusFinal: string;
        cimAutor: string;
        dataDeCriacao: string;
        dataDeAtualizacao: string;
        titulo: string;

        conteudoRenuncia?: {
            textoFormal: string;
        }
    }
}


export default function SessionRenuncia(props: RenunciaProps) {
    const acao = props.acao;
    const renuncia = props.acao.conteudoRenuncia;

    if (renuncia) {
        /* Componentes da Página */
        const cardStatusFinalAprovado = (
            <CardInfo titulo={"Deferido em: " + formatDate(acao.dataDeAtualizacao)} icone="like" cor="ok" />
        );

        const cardStatusFinalReprovado = (
            <CardInfo titulo={"Indeferido em: " + formatDate(acao.dataDeAtualizacao)} icone="dislike" cor="attention" />
        );


        /* Construção da Página */
        return (
            <div className="sessionRenuncia">
                {acao.statusAtual === "concluido" && (
                    <div className="cardStatusFinal">
                        {acao.statusFinal === "aprovado" ? cardStatusFinalAprovado : cardStatusFinalReprovado}
                    </div>
                )}

                <div className="data">
                    <p><b>Solicitado em: </b>{formatDate(acao.dataDeCriacao)}</p>
                </div>

                <div className="pedidoTexto">
                    <p><b>Carta de solicitação:</b></p>
                    {<TextBoxExpand text={renuncia.textoFormal} />}
                </div>
            </div>
        );
    }
}