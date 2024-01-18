'use client';

import { useEffect, useState } from "react";
import { useAPI } from "@/hooks/Api";
import { API } from "@/functions/urls";
import OpenConfirmModal from "@/components/button/OpenConfirmModal";

import './style.scss';


type ButtonsAcoesProps = {
    autor: string;

    acao: {
        tipo: string;
        statusAtual: string;

        conteudoProposta?: {
            assinaturasNecessarias: number;

            assinaturas?: {
                cim: string;
                nome: string;
            }[];

            comissoesEncaminhadas?: {
                id: string;
                parecer: string;
            }[];
        };

        conteudoEmenda?: {
            comissoesEncaminhadas?: {
                id: string;
                parecer: string;
            }[];
        }
    }
}


export default function ButtonsAcoes(props: ButtonsAcoesProps) {
    const acao = props.acao;
    const [userPresidente, setUserPresidente] = useState(false);
    const [userPresidenteComissao, setUserPresidenteComissao] = useState(false);
    const [userAutor, setUserAutor] = useState(false);
    const { get } = useAPI();

    useEffect(() => {
        const checkUserIs = async () => {
            try {
                const responsePresidente = await get(`${API}/check/user/presidente`);
                //const responsePresidenteComissao = await get(`${API}/check/user/presidente/comissao=${group.id}`);
                const responseAutor = await get(`${API}/check/user/autor/cim=${props.autor}`);

                // Somente atualizar se a resposta for igual a "true"
                if (responsePresidente.data === true) {
                    setUserPresidente(true);
                }

                if (responseAutor.data === true) {
                    setUserAutor(true);
                }
            }
            catch (error: any) {
                console.error('Error:', error);
            }
        };

        checkUserIs();
    }, []);


    const confirmButton = (botaoTexto: string, modalPergunta: string, modalDescricao: string, botaoAcao: () => void, botaoCor: string) => (
        <OpenConfirmModal
            tagType="button"
            className={botaoCor}
            title={modalPergunta}
            text={modalDescricao}
            action={botaoAcao}
            actionText={botaoTexto}
        >
            <p>{botaoTexto}</p>
        </OpenConfirmModal>
    );

    let buttons = (<></>);


    if (acao.tipo === "proposta") {
        const assinaturasNecessarias = (acao.conteudoProposta?.assinaturas?.length || 0) > (acao.conteudoProposta?.assinaturasNecessarias || 0);
        const todosPareceres = acao.conteudoProposta?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== "")

        /* Quais botões mostrar em cada status */

        if (acao.statusAtual === "autor" && userAutor) {
            buttons = (
                <>
                    {/* Editar proposta */}
                </>
            )
        }

        if (acao.statusAtual === "redacao" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Pautar", "Mover ação para a pauta?", "Para receber apoio dos deputados", () => { }, "btnPrimary")}
                    {/* Solicitar ajustes */}
                    {confirmButton("Reprovar", "Reprovar ação?", "Essa proposta será finalizada", () => { }, "btnAttention")}
                </>
            )
        }

        if (acao.statusAtual === "pauta") {
            buttons = (
                <>
                    {confirmButton("Assinar apoio", "Apoiar proposta?", "Sua assinatura será a favor dessa ação", () => { }, "btnPrimary")}

                    {(assinaturasNecessarias && userPresidente) && (
                        {/* Enc. comissão... */ }
                    )}
                </>
            )
        }

        if (acao.statusAtual === "comissao" && userPresidente) {
            buttons = (
                <>
                    {/* Enviar parecer */}

                    {/* Enc. comissão */}

                    {todosPareceres && (
                        <>
                            {confirmButton("Enc. plenário", "Encaminhar para o plenário?", "A ação ficará disponível para votação", () => { }, "btnPrimary")}
                            {confirmButton("Reprovar", "Reprovar ação?", "Essa proposta será finalizada", () => { }, "btnAttention")}
                        </>
                    )}
                </>
            )
        }

        if (acao.statusAtual === "plenario" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Priorizar", "Deseja priorizar a proposta?", "A ação será atualizada para o início da lista", () => { }, "btnPrimary")}
                    {/* Cadastrar votação */}
                </>
            )
        }
    }


    if (acao.tipo === "emenda") {
        const todosPareceres = acao.conteudoEmenda?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== "")

        /* Quais botões mostrar em cada status */

        if (acao.statusAtual === "autor" && userAutor) {
            buttons = (
                <>
                    {/* Editar proposta */}
                </>
            )
        }

        if (acao.statusAtual === "redacao" && userPresidente) {
            buttons = (
                <>
                    {/* Enc. comissão... */}
                    {/* Solicitar ajustes */}
                    {confirmButton("Reprovar", "Reprovar ação?", "Essa emenda será finalizada", () => { }, "btnAttention")}
                </>
            )
        }

        if (acao.statusAtual === "comissao" && userPresidente) {
            buttons = (
                <>
                    {/* Enviar parecer */}

                    {/* Enc. comissão */}

                    {todosPareceres && (
                        <>
                            {confirmButton("Enc. plenário", "Encaminhar para o plenário?", "A ação ficará disponível para votação", () => { }, "btnPrimary")}
                            {confirmButton("Reprovar", "Reprovar ação?", "Essa emenda será finalizada", () => { }, "btnAttention")}
                        </>
                    )}
                </>
            )
        }

        if (acao.statusAtual === "plenario" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Priorizar", "Deseja priorizar a emenda?", "A ação será atualizada para o início da lista", () => { }, "btnPrimary")}
                    {/* Cadastrar votação */}
                </>
            )
        }
    }


    if (acao.tipo === "licenca") {
        if (acao.statusAtual === "pendente" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Deferir", "Deferir pedido?", "Esse pedido de licença será aceito", () => { }, "btnSucess")}
                    {confirmButton("Indeferir", "Indeferir pedido?", "Esse pedido de licença será negado", () => { }, "btnAttention")}
                </>
            )
        }
    }

    if (acao.tipo === "renuncia") {
        if (acao.statusAtual === "pendente" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Deferir", "Deferir pedido?", "Esse pedido de renúncia será aceito", () => { }, "btnSucess")}
                    {confirmButton("Indeferir", "Indeferir pedido?", "Esse pedido de renúncia será negado", () => { }, "btnAttention")}
                </>
            )
        }
    }


    return (
        <div className="buttonsAcoes">
            {buttons}
        </div>
    );
}