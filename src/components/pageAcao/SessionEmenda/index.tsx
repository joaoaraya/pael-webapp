'use client';

import { capitalize, formatDate } from '@/functions/visual';

import OpenModal from '@/components/button/OpenModal';
import ModalComissoesEncaminhadas from '@/components/modal/ModalComissoesEncaminhadas';
import ModalPlenarioVotos from '@/components/modal/ModalPlenarioVotos';
import ListPropostaVinculada from '@/components/session/ListPropostaVinculada';
import TextBoxExpand from '@/components/session/TextBoxExpand';
import CardInfo from '@/components/card/CardInfo';
import CardAcaoSteps from '@/components/card/CardAcaoSteps';
import './style.scss';


type EmendaProps = {
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

        conteudoEmenda?: {
            idPropostaVinculada: string;
            textoArtigo: string;
            textoProposta: string;
            textoJustificativa: string;
            alteracoes: string;
            info: {
                titulo: string;
                descricao: string;
            };

            comissoesEncaminhadas?: {
                id: string;
                nome: string;
                parecer: string;
            }[];

            plenarioVotos?: {
                aFavor: number;
                contra: number;
                abstencao: number;
            };
        }
    }
}


export default function SessionEmenda(props: EmendaProps) {
    const acao = props.acao;
    const emenda = props.acao.conteudoEmenda;

    if (emenda) {
        /* Componentes da Página */
        const cardStatusFinalAprovado = (
            <CardInfo titulo={"Aprovado em: " + formatDate(acao.dataDeAtualizacao)} icone="like" cor="ok" />
        );

        const cardStatusFinalReprovado = (
            <CardInfo titulo={"Reprovado em: " + formatDate(acao.dataDeAtualizacao)} icone="dislike" cor="attention" />
        );

        const cardAcaoSteps = (
            <CardAcaoSteps statusAtual={acao.statusAtual} tipo={acao.tipo} />
        );

        const cardInfo = (
            <CardInfo titulo={"Emenda " + capitalize(emenda.info.titulo)} descricao={emenda.info.descricao} />
        );

        const cardAlteracoes = (
            <CardInfo
                titulo="Alterações solicitadas pelo presidente:"
                descricao={emenda.alteracoes}
                icone="edit"
                cor="warning"
            />
        );

        const listPropostaVinculada = (
            <ListPropostaVinculada id={emenda.idPropostaVinculada} />
        );

        const buttonComissoesEncaminhadas = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Comissões (${emenda.comissoesEncaminhadas?.length || 0})`}
                modalContent={<ModalComissoesEncaminhadas comissoes={emenda.comissoesEncaminhadas || []} />}
            >
                Comissões encaminhadas (<b>{emenda.comissoesEncaminhadas?.length || 0}</b>)
            </OpenModal>
        );

        const totalVotosPlenario =
            (emenda.plenarioVotos?.aFavor || 0) +
            (emenda.plenarioVotos?.contra || 0) +
            (emenda.plenarioVotos?.abstencao || 0);

        const buttonPlenarioVotos = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Plenário votos (${totalVotosPlenario})`}
                modalContent={<ModalPlenarioVotos votos={emenda.plenarioVotos} />}
            >
                Plenário votos (<b>{totalVotosPlenario}</b>)
            </OpenModal>
        );


        /* Construção da Página */
        return (
            <div className="sessionEmenda">
                {acao.statusAtual === "concluido" ?
                    <div className="cardStatus">
                        {acao.statusFinal === "aprovado" ? cardStatusFinalAprovado : cardStatusFinalReprovado}
                    </div>
                    :
                    <div className="cardStatus">
                        {cardAcaoSteps}
                    </div>
                }

                <div className="cardInfoDesc">{cardInfo}</div>

                {acao.statusAtual === "autor" && (
                    <div className="cardAlteracoes">{cardAlteracoes}</div>
                )}

                <div className="data">
                    <p><b>Criado em: </b>{formatDate(acao.dataDeCriacao)}</p>
                    <p><b>Atualizado em: </b>{formatDate(acao.dataDeAtualizacao)}</p>
                </div>

                <div className="propostaTexto">
                    <p><b>Artigo:</b> {emenda.textoArtigo}</p>

                    <p><b>Proposta:</b></p>
                    {<TextBoxExpand text={emenda.textoProposta} />}

                    <p><b>Justificativa:</b></p>
                    {<TextBoxExpand text={emenda.textoJustificativa} />}
                </div>

                {emenda.comissoesEncaminhadas && (
                    <div className="comissoesEncaminhadas">{buttonComissoesEncaminhadas}</div>
                )}

                {emenda.plenarioVotos && (
                    <div className="plenarioVotos">{buttonPlenarioVotos}</div>
                )}

                <div className="propostaVinculada">
                    {listPropostaVinculada}
                </div>
            </div>
        );
    }
}