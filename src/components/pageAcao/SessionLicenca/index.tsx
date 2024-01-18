'use client';

import { capitalize, formatDate } from '@/functions/visual';
import CardInfo from '@/components/card/CardInfo';
import './style.scss';


type LicencaProps = {
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

        conteudoLicenca?: {
            motivo: string;
            diasAfastamento: number;
        }
    }
}


export default function SessionLicenca(props: LicencaProps) {
    const acao = props.acao;
    const licenca = props.acao.conteudoLicenca;

    if (licenca) {
        /* Componentes da Página */
        const cardStatusFinalAprovado = (
            <CardInfo titulo="Deferido" icone="like" cor="ok" />
        );

        const cardStatusFinalReprovado = (
            <CardInfo titulo="Indeferido" icone="dislike" cor="attention" />
        );


        /* Construção da Página */
        return (
            <div className="sessionLicenca">
                {acao.statusAtual === "concluido" && (
                    <div className="cardStatusFinal">
                        {acao.statusFinal === "aprovado" ? cardStatusFinalAprovado : cardStatusFinalReprovado}
                    </div>
                )}

                <div className="dados">
                    <p><b>Solicitado em: </b>{formatDate(acao.dataDeCriacao)}</p>
                    <p><b>Motivo:</b> {capitalize(licenca.motivo)}</p>
                    <p><b>Tempo de afastamento:</b> {licenca.diasAfastamento} dias</p>
                </div>
            </div>
        );
    }
}