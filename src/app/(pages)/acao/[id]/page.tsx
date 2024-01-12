'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';

import ButtonPessoa from '@/components/button/ButtonPessoa';
import CardInfo from '@/components/card/CardInfo';
import OpenModal from '@/components/button/OpenModal';
import ModalAssinaturas from '@/components/modal/ModalAssinaturas';
import ModalEncaminharComissao from '@/components/modal/ModalEncaminharComissao';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';

import './style.scss';
import { capitalize, formatDate } from '@/functions/visual';


type PageProps = {
    id: string;
}

type AcaoProps = {
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
    };

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
        }[];
    };

    conteudoLicenca?: {
        motivo: string;
        diasAfastamento: number;
    };

    conteudoRenuncia?: {
        textoFormal: string;
    }
}

type AutorProps = {
    nome: string;
    cim: number;
    loja: string;
    lojaNumero: number;
    cargo: string;
    ativo: boolean;
    situacao: string;
    cpf?: string;
    email?: string;
    celular?: string;
    cimSuplente?: string;
    nomeSuplente?: string;
    cargos?: {
        nome: string;
        dataNomeacao: string;
        dataTermino: string;
    }[];
}


export default function PageAcao({ params }: { params: PageProps }) {
    const Router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [acao, setAcao] = useState<AcaoProps>();
    const [autor, setAutor] = useState<AutorProps>();
    const { get } = useAPI();

    useEffect(() => {
        const loadData = async () => {
            try {
                const responseAcao = await get(`${API}/acao/${params.id}`);
                const responseAutor = await get(`${API}/user/${responseAcao.data.cimAutor}`);

                setAcao(responseAcao.data);
                setAutor(responseAutor.data);

                setIsLoading(false);
            }
            catch (error: any) {
                console.error('Error:', error);

                // Se for erro de autenticação:
                // FAZER!!
                //Router.push('/');
                setIsLoading(false);
            }
        }

        loadData();
    }, []);


    if (isLoading) {
        return (<>Carregando...</>)
    }

    if (acao && autor) {
        const dataDeCriacao = formatDate(acao.dataDeCriacao);
        const dataDeAtualizacao = formatDate(acao.dataDeAtualizacao);

        const proposta = (
            <div className="postTipoProposta">
                <div className="postInfo">
                    <CardInfo
                        titulo={acao.conteudoProposta?.info.titulo || ''}
                        descricao={acao.conteudoProposta?.info.descricao || ''}
                    />
                </div>

                {/* FAZER!!!! (MOSTRAR APROVADO OU REPROVADO)
                {!acao.ativo && (
                    <div className="postAlteracoes">
                        <CardInfo
                            titulo="Alterações solicitadas pelo presidente:"
                            descricao={post.conteudoProposta?.alteracoes || ''}
                            icone="edit"
                            cor="attention"
                        />
                    </div>
                )}
                */}

                {acao.statusAtual === "autor" && (
                    <div className="postAlteracoes">
                        <CardInfo
                            titulo="Alterações solicitadas pelo presidente:"
                            descricao={acao.conteudoProposta?.alteracoes || ''}
                            icone="edit"
                            cor="warning"
                        />
                    </div>
                )}

                <div className="postData">
                    <p><b>Criado em: </b>{dataDeCriacao}</p>
                    <p><b>Atualizado em: </b>{dataDeAtualizacao}</p>
                </div>

                <div className="postTexto">
                    <p><b>Proposta:</b></p>
                    <p>{acao.conteudoProposta?.textoProposta}</p>
                </div>

                {!["autor", "redacao"].includes(acao.statusAtual) && (
                    <>
                        <div className="postAssinaturas">
                            <OpenModal
                                tagType="p"
                                className="showAssinaturas"
                                modalTitle={`Assinaturas (${acao.conteudoProposta?.assinaturas?.length || 0})`}
                                modalContent={<ModalAssinaturas assinaturas={acao.conteudoProposta?.assinaturas || []} />}
                            >
                                Assinaturas: <b>{acao.conteudoProposta?.assinaturas?.length || 0}</b>
                            </OpenModal>
                            <p>
                                Assinaturas necessárias: <b>{acao.conteudoProposta?.assinaturasNecessarias}</b>
                            </p>
                        </div>
                    </>
                )}

                {["comissao", "MUDAR_ISSO"].includes(acao.statusAtual) && (
                    <>
                        {/*
    
                        OBS. Ao abrir o modal mostra as comissoes com:
                         um like verde (aprovado)
                         um deslike vermelho (reprovado)
                         um "?" para aguardando resposta ou ""
    
                        <div className="postComissoes">
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


                <div className="postAcoes">
                    {acao.ativo && (
                        <>
                            {acao.statusAtual === "autor" && (
                                <div className="buttonsGrupo">
                                    {/* Somente o Autor / se user.id_cim === 1249 */}

                                    {acao.conteudoProposta?.alteracoes !== '' && (
                                        <button className="btnPrimary">
                                            <p>Editar proposta</p>
                                            {/* abre modal para editar o texto da proposta + botao salvar */}
                                        </button>
                                    )}

                                    <button className="btnPrimary">
                                        <p>Enc. redação</p>
                                        {/* status = 1, data atulizada */}
                                    </button>
                                </div>
                            )}

                            {acao.statusAtual === "redacao" && (
                                <div className="buttonsGrupo">
                                    {/* Somente o Presidente: */}

                                    <button className="btnPrimary">
                                        <p>Solicitar alterações</p>
                                        {/* abre modal com caixa de texto + botao enviar / status = 0, alteracao = "texto..." */}
                                    </button>

                                    <button className="btnPrimary">
                                        <p>Pautar</p>
                                        {/* status = 2, data atualizada */}
                                    </button>

                                    <button className="btnPrimary reprovar">
                                        <p>Reprovar</p>
                                        {/* statusFinal = "reprovado", data atualizada*/}
                                    </button>
                                </div>
                            )}

                            {acao.statusAtual === "pauta" && (
                                <div className="buttonsGrupo">
                                    {/* Todos */}

                                    <button className="btnPrimary">
                                        <p>Apoiar</p>
                                        {/* abre modal de confirmação + seu nome será adicionado a lista de assinaturas 
                                        se você for o numero que define o minimo (ex: assinaturas minimas: 21 e vc for o 20)
                                        ao apoiar você mudará o status = 3 + data atualizada */}
                                    </button>
                                </div>
                            )}

                            {acao.statusAtual === "pauta" && (
                                <div className="buttonsGrupo">
                                    {/* Todos */}

                                    <button className="btnPrimary">
                                        <p>Apoiar</p>
                                        {/* abre modal de confirmação + seu nome será adicionado a lista de assinaturas */}
                                    </button>

                                    {/* Somente o Presidente */}

                                    <button className="btnPrimary">
                                        <p>Enc. comissão</p>
                                        {/* abre modal de comissões + status = 4, data atualizada */}
                                    </button>
                                </div>
                            )}

                            {acao.statusAtual === "comissao" && (
                                <div className="buttonsGrupo">
                                    {/* Somente Presidente(s) da(s) Comissao(es) encaminhada(s) */}

                                    <button className="btnPrimary">
                                        <p>Parecer</p>
                                        {/* Abre modal com um dois radio buttons (aprovar) - (reprovar) + botão de enivar (modal de confirmacao) 
                                            É possivel alterar a resposta enquanto for status = 4.*/}
                                    </button>

                                    {/* Somente Presidente */}

                                    <button className="btnPrimary">
                                        <p>Enc. comissão</p>
                                        {/* abre modal de comissões */}
                                    </button>

                                    {/* Quanto todas as Comissões encaminhadas derem um pareecer ou a resposta nao for = "" */}
                                    {acao.conteudoProposta?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== '') && (
                                        <>
                                            <button className="btnPrimary">
                                                <p>Enc. plenário</p>
                                                {/* abre modal de confirmação, status = 5, atualiza data*/}
                                            </button>

                                            <button className="btnPrimary reprovar">
                                                <p>Reprovar</p>
                                                {/* abre modal de confirmação, ativo = false, statusFinal = "reprovado', data atualizada,*/}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}

                            {acao.statusAtual === "plenario" && (
                                <div className="buttonsGrupo">
                                    {/* Somente o Presidente */}

                                    <button className="btnPrimary">
                                        <p>Priorizar</p>
                                        {/* abre modal de confirmação + insere no array de prioridades */}
                                    </button>

                                    <button className="btnPrimary">
                                        <p>Cadastrar votação</p>
                                        {/* abre modal de cadastro de votos + botao gerar resultado
                                        se for: aprovado -> data atualizada, ativo = false, statusFinal = "aprovado' 
                                        se for: reprovado -> data atualizada, ativo = false, statusFinal = "reprovado'*/}
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    <button className="btnSecondary">
                        <p>Voltar</p>
                    </button>


                    {/* TESTES 
                    <OpenModal
                        tagType="button"
                        className="btnPrimary"
                        modalTitle="Comissões"
                        modalContent={<ModalEncaminharComissao />}
                        modalFooterContent={
                            <OpenConfirmModal
                                tagType="button"
                                className="btnPrimary"
                                confirmModalTitle="Deseja salvar?"
                                confirmModalText="Salvar alterações no"
                                confirmModalAction={() => { }}
                                confirmModalActionText="Salvar"
                            >
                                <p>Salvar</p>
                            </OpenConfirmModal>}
                    >
                        <p>Encaminhar..</p>
                    </OpenModal>
                    */}
                </div>
            </div>
        );

        const emenda = (
            <div className="postTipoEmenda">
                <div className="postInfo">
                    <CardInfo
                        titulo={acao.conteudoEmenda?.info.titulo || ''}
                        descricao={acao.conteudoEmenda?.info.descricao || ''}
                    />
                </div>

                <div className="postData">
                    <p><b>Criado em:</b> {dataDeCriacao} </p>
                    <p><b>Atualizado em:</b> {dataDeAtualizacao}</p>
                </div>

                <div className="postTexto">
                    <p><b>Artigo:</b> {acao.conteudoEmenda?.textoArtigo}</p>
                    <p><b>Proposta:</b> <br /> {acao.conteudoEmenda?.textoProposta}</p>
                    <p><b>Justificativa:</b> <br /> {acao.conteudoEmenda?.textoJustificativa}</p>
                </div>

                <div className="postAcoes">
                    <button className="btnSecondary">
                        <p>Voltar</p>
                    </button>

                    {/*O botão de ação muda de acordo com "status" e nivel de usuario*/}
                    <button className="btnPrimary">
                        <img src="https://example.com/icone.png" alt="" />
                        <p>Encaminhar...</p>
                    </button>
                </div>
            </div>
        );

        const licenca = (
            <div className="postTipoLicenca">
                <div className="postData">
                    <p><b>Solicitado em:</b> {dataDeCriacao} </p>
                </div>

                <div className="postTexto">
                    <p><b>Motivo:</b> {acao.conteudoLicenca?.motivo}</p>
                    <p><b>Tempo de afastamento: </b> {acao.conteudoLicenca?.diasAfastamento} dias</p>
                    <p><b>Pedido de licença:</b> <br /> {acao.conteudoLicenca?.textoFormal}</p>
                </div>

                <div className="postAcoes">
                    <div className="buttonsGrupo">
                        {/*O botão de ação muda de acordo com "status" e nivel de usuario*/}
                        <button className="btnPrimary aprovar">
                            <p>Deferir</p>
                        </button>

                        <button className="btnPrimary reprovar">
                            <p>Indeferir</p>
                        </button>
                    </div>

                    <div className="buttonsGrupo">
                        <button className="btnSecondary">
                            <p>Voltar</p>
                        </button>
                    </div>
                </div>
            </div>
        );

        const renuncia = (
            <div className="postTipoRenuncia">
                <div className="postData">
                    <p><b>Solicitado em:</b> {dataDeCriacao} </p>
                </div>

                <div className="postTexto">
                    <p>
                        <b>Pedido de Renúncia:</b>
                        <br />
                        {acao.conteudoRenuncia?.textoFormal}
                    </p>
                </div>

                <div className="postAcoes">
                    <div className="buttonsGrupo">
                        {/*O botão de ação muda de acordo com "status" e nivel de usuario*/}
                        <button className="btnPrimary aprovar">
                            <p>Deferir</p>
                        </button>

                        <button className="btnPrimary reprovar">
                            <p>Indeferir</p>
                        </button>
                    </div>

                    <div className="buttonsGrupo">
                        <button className="btnSecondary">
                            <p>Voltar</p>
                        </button>
                    </div>
                </div>
            </div>
        );


        return (
            <div className="pageViewAcao">
                <div className="postTitulo">
                    <h1>{capitalize(acao.titulo)}</h1>
                </div>

                <div className="postAutor">
                    <p id="label">Deputado:</p>
                    <ButtonPessoa user={autor} />
                </div>

                <>
                    {acao.tipo === 'proposta' && (proposta)}
                    {acao.tipo === 'emenda' && (emenda)}
                    {acao.tipo === 'licenca' && (licenca)}
                    {acao.tipo === 'renuncia' && (renuncia)}
                </>
            </div>
        )
    }

    return (<>Você não tem permição para ver essa ação...</>)
}
