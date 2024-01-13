'use client';

import { formatDate } from '@/functions/visual';

import CardInfo from '@/components/card/CardInfo';
import OpenModal from '@/components/button/OpenModal';
import ModalAssinaturas from '@/components/modal/ModalAssinaturas';
import ButtonsAcoes from '@/components/pageAcao/ButtonsAcoes';
import ModalComissoesEncaminhadas from '@/components/modal/ModalComissoesEncaminhadas';

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
            }[];

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
            </OpenModal>
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
                    <>
                        {/*

                    OBS. Ao abrir o modal mostra votos com:
                        Grafico de pizza (componente)

                    Votos a favor: number; (cor ver)
                    Votos contra: number; (cor vermelho)
                    Votos abstencao: number (cor cinza)
                    ---
                    Total de votos: number

                    icone na frente + nome da comissão

                    <div className="plenarioVotos">
                        <OpenModal
                            tagType="p"
                            className="showAssinaturas"
                            modalTitle={`Assinaturas (${post.conteudoProposta?.assinaturas?.length || 0})`}
                            modalContent={modalAssinaturasContent}
                        >
                            Comissões com pareceres: <b>{post.conteudoProposta?.assinaturas?.length || 0}</b>
                        </OpenModal>
                        <p>
                            Comissões encaminhadas: <b>{post.conteudoProposta?.assinaturasNecessarias}</b>
                        </p>
                    </div>
                    */}
                    </>
                )}

                {proposta.emendasVinculadas && (
                    <>
                        {
                            /* Mostrar modal de emendas vinculadas (ex: emeda 01: em andanmento/concluida)
                            link para ir para ação da emenda

                            <div className="emendasVinculadas">
                                <ModalEmendasVinculadas emendas={proposta.emendasVinculadas}/>
                            </div>
                            /*/
                        }
                    </>
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