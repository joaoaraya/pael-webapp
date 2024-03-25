'use client';

import { formatDate } from '@/functions/visual';

import OpenModal from '@/components/button/OpenModal';
import ModalAnexos from '@/components/modal/ModalAnexos';
import ModalAssinaturas from '@/components/modal/ModalAssinaturas';
import ModalComissoesEncaminhadas from '@/components/modal/ModalComissoesEncaminhadas';
import ModalPlenarioVotos from '@/components/modal/ModalPlenarioVotos';
import TextBoxExpand from '@/components/session/TextBoxExpand';
import CardInfo from '@/components/card/CardInfo';
import ListEmendasVinculadas from '@/components/session/ListEmendasVinculadas';

import './style.scss';
import CardAcaoSteps from '@/components/card/CardAcaoSteps';


type PropostaProps = {
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

        conteudoProposta?: {
            textoProposta: string;
            alteracoes: string;
            info: {
                titulo: string;
                descricao: string;
            };
            assinaturasNecessarias: number;

            assinaturas?: {
                cim: string;
                nome: string;
            }[];

            comissoesEncaminhadas?: {
                id: string;
                nome: string;
                parecer: string;
            }[];

            aceitarEmendas: boolean;

            emendasVinculadas?: {
                id: string;
                ativo: boolean;
                statusFinal: string;
            }[];

            plenarioVotos?: {
                aFavor: number;
                contra: number;
                abstencao: number
            };

            anexos?: {
                titulo: string;
                nomeArquivo: string;
            }[];
        }
    }
}


export default function SessionProposta(props: PropostaProps) {
    const acao = props.acao;
    const proposta = props.acao.conteudoProposta;

    if (proposta) {

        /* Componentes da Página */
        const cardStatusFinalAprovado = (
            <CardInfo titulo={"Aprovado no sistema em: " + formatDate(acao.dataDeAtualizacao)} icone="like" cor="ok" />
        );

        const cardStatusFinalReprovado = (
            <CardInfo titulo={"Reprovado no sistema em: " + formatDate(acao.dataDeAtualizacao)} icone="dislike" cor="attention" />
        );

        const cardAcaoSteps = (
            <CardAcaoSteps statusAtual={acao.statusAtual} tipo={acao.tipo} />
        );

        const cardInfo = (
            <CardInfo titulo={proposta.info.titulo} descricao={proposta.info.descricao} />
        );

        const cardAlteracoes = (
            <CardInfo
                titulo="Alterações solicitadas pelo Presidente:"
                descricao={proposta.alteracoes}
                icone="edit"
                cor="warning"
            />
        );

        const buttonAnexos = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Anexos (${proposta.anexos?.length || 0})`}
                modalContent={<ModalAnexos acao={acao} anexos={proposta.anexos} />}
            >
                Anexos (<b>{proposta.anexos?.length || 0}</b>)
            </OpenModal>
        );

        const buttonAssinaturas = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Assinaturas (${proposta.assinaturas?.length || 0})`}
                modalContent={<ModalAssinaturas assinaturas={proposta.assinaturas || []} />}
            >
                Assinaturas (<b>{proposta.assinaturas?.length || 0}</b>)
            </OpenModal >
        );

        const buttonComissoesEncaminhadas = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Comissões (${proposta.comissoesEncaminhadas?.length || 0})`}
                modalContent={<ModalComissoesEncaminhadas comissoes={proposta.comissoesEncaminhadas || []} />}
            >
                Comissões encaminhadas (<b>{proposta.comissoesEncaminhadas?.length || 0}</b>)
            </OpenModal>
        );

        const totalVotosPlenario =
            (proposta.plenarioVotos?.aFavor || 0) +
            (proposta.plenarioVotos?.contra || 0) +
            (proposta.plenarioVotos?.abstencao || 0);

        const buttonPlenarioVotos = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Plenário votos (${totalVotosPlenario})`}
                modalContent={<ModalPlenarioVotos votos={proposta.plenarioVotos} />}
            >
                Plenário votos (<b>{totalVotosPlenario}</b>)
            </OpenModal>
        );

        const listEmendasVinculadas = (
            <ListEmendasVinculadas emendas={proposta.emendasVinculadas} />
        );


        /* Construção da Página */
        return (
            <div className="sessionProposta">

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
                    <p><b>Proposta:</b></p>
                    {<TextBoxExpand text={proposta.textoProposta} />}
                </div>

                {proposta.anexos && (
                    <div className="anexos">{buttonAnexos}</div>
                )}

                {(acao.statusAtual === "pauta" || proposta.assinaturas) && (
                    <div className="assinaturasDeputados">
                        <p>
                            {buttonAssinaturas}
                            <br />
                            Assinaturas necessárias: <b>{proposta.assinaturasNecessarias}</b>
                        </p>
                    </div>
                )}

                {proposta.comissoesEncaminhadas && (
                    <div className="comissoesEncaminhadas">{buttonComissoesEncaminhadas}</div>
                )}

                {proposta.plenarioVotos && (
                    <div className="plenarioVotos">{buttonPlenarioVotos}</div>
                )}

                {proposta.emendasVinculadas && (
                    <div className="emendasVinculadas">{listEmendasVinculadas}</div>
                )}
            </div>
        );
    }
}