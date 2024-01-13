'use client';

import { formatDate } from '@/functions/visual';

import CardInfo from '@/components/card/CardInfo';
import OpenModal from '@/components/button/OpenModal';
import ModalAssinaturas from '@/components/modal/ModalAssinaturas';
import ButtonsAcoes from '@/components/pageAcao/ButtonsAcoes';
import ModalComissoesEncaminhadas from '@/components/modal/ModalComissoesEncaminhadas';
import ModalPlenarioVotos from '@/components/modal/ModalPlenarioVotos';
import ModalEmendasVinculadas from '@/components/modal/ModalEmendasVinculadas';

//import './style.scss';


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
        const cardStatusFinalAprovado = (
            <CardInfo titulo="Aprovado" icone="like" cor="ok" />
        );

        const cardStatusFinalReprovado = (
            <CardInfo titulo="Reprovado" icone="dislike" cor="attention" />
        );

        const cardInfo = (
            <CardInfo titulo={proposta.info.titulo} descricao={proposta.info.descricao} />
        );

        const cardAlteracoes = (
            <CardInfo
                titulo="Alterações solicitadas pelo presidente:"
                descricao={proposta.alteracoes}
                icone="edit"
                cor="warning"
            />
        );

        const buttonAssinaturas = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Assinaturas (${proposta.assinaturas?.length || 0})`}
                modalContent={<ModalAssinaturas assinaturas={proposta.assinaturas || []} />}
            >
                Assinaturas: <b>{proposta.assinaturas?.length || 0}</b>
            </OpenModal >
        );

        const buttonComissoesEncaminhadas = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Comissões (${proposta.comissoesEncaminhadas?.length || 0})`}
                modalContent={<ModalComissoesEncaminhadas comissoes={proposta.comissoesEncaminhadas || []} />}
            >
                Comissões: <b>{proposta.comissoesEncaminhadas?.length || 0}</b>
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
                Plenário votos: <b>{totalVotosPlenario}</b>
            </OpenModal>
        );

        const buttonEmendasVinculadas = (
            <OpenModal
                tagType="p"
                className="link"
                modalTitle={`Emendas vinculadas (${proposta.emendasVinculadas?.length || 0})`}
                modalContent={<ModalEmendasVinculadas emendas={proposta.emendasVinculadas} />}
            >
                Emendas dessa ação: <b>{proposta.emendasVinculadas?.length || 0}</b>
            </OpenModal>
        );


        return (
            <div className="sessionProposta">

                {acao.statusAtual === "concluido" && (
                    <div className="cardStatusFinal">
                        {acao.statusFinal === "aprovado" ? cardStatusFinalAprovado : cardStatusFinalReprovado}
                    </div>
                )}

                <div className="cardInfo">{cardInfo}</div>

                {acao.statusAtual === "autor" && (
                    <div className="cardAlteracoes">{cardAlteracoes}</div>
                )}

                <div className="data">
                    <p><b>Criado em: </b>{formatDate(acao.dataDeCriacao)}</p>
                    <p><b>Atualizado em: </b>{formatDate(acao.dataDeAtualizacao)}</p>
                </div>

                <div className="propostaTexto">
                    <p><b>Proposta:</b></p>
                    <p>{proposta.textoProposta}</p>
                    <button>Mostrar Mais !FAZER!</button>
                </div>

                {(acao.statusAtual === "pauta" || proposta.assinaturas) && (
                    <div className="assinaturasDeputados">
                        {buttonAssinaturas}
                        <p>Assinaturas necessárias: <b>{proposta.assinaturasNecessarias}</b></p>
                    </div>
                )}

                {proposta.comissoesEncaminhadas && (
                    <div className="comissoesEncaminhadas">{buttonComissoesEncaminhadas}</div>
                )}

                {proposta.plenarioVotos && (
                    <div className="plenarioVotos">{buttonPlenarioVotos}</div>
                )}

                {proposta.emendasVinculadas && (
                    <div className="emendasVinculadas">{buttonEmendasVinculadas}</div>
                )}

                {proposta.anexos && (
                    <>
                        {
                            /*Mostrar blocos de pdfs com nome em baixo 
                            
                            <div className="anexos">
                                <ListAnexos docs={proposta.anexos} />
                            </div>
                            */
                        }
                    </>
                )}
            </div>
        );
    }

    return (<></>);
}