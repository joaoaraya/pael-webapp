'use client';

import { ReactNode, useEffect, useState } from "react";
import { useAPI } from "@/hooks/Api";
import { API } from "@/functions/urls";
import Link from "next/link";
import OpenConfirmModal from "@/components/button/OpenConfirmModal";
import OpenModal from "@/components/button/OpenModal";
import ModalEncaminharComissao from "@/components/modal/ModalEncaminharComissao";

import ModalSolicitarAjustes from "@/components/modal/ModalSolicitarAjustes";
import ResponseModal from "@/components/modal/ResponseModal";
import './style.scss';


type ButtonsAcoesProps = {
    autor: string;
    acao: {
        id: string;
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
    const { get, put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);

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


    /* Ações */
    const acaoPautar = async () => {
        try {
            const response = await put(`${API}/acao/${acao.id}/status=pauta`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(6)} />);
        }
    }

    const acaoReprovar = async () => {
        try {
            const response = await put(
                `${API}/acao/${acao.id}/status=concluido`,
                "application/json",
                JSON.stringify({ statusFinal: "reprovado" })
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(6)} />);
        }
    }

    const acaoAssinarApoio = async () => {
        try {
            const response = await put(`${API}/acao/${acao.id}/pauta/assinatura`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(6)} />);
        }
    }

    const acaoEncPlenario = async () => {
        try {
            const response = await put(`${API}/acao/${acao.id}/status=plenario`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(6)} />);
        }
    }


    /* Botões */

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

    const modalButton = (botaoTexto: string, modalTitulo: string, modal: ReactNode, modalBotaoAcao: ReactNode, botaoCor: string) => (
        <OpenModal
            tagType="button"
            className={botaoCor}
            modalTitle={modalTitulo}
            modalContent={modal}
            modalFooterContent={modalBotaoAcao}
        >
            <p>{botaoTexto}</p>
        </OpenModal>
    );

    const encComissaoButton = (
        modalButton("Enc. comissão", "Encaminhar para...", <ModalEncaminharComissao />, <></>, "btnPrimary")
    );

    const encPlenarioButton = (
        confirmButton("Enc. plenário", "Encaminhar ação para plenário?", "Essa proposta ficará disponível para votação", acaoEncPlenario, "btnPrimary")
    );

    const reprovarButton = (
        confirmButton("Reprovar", "Reprovar ação?", "Essa proposta será finalizada", acaoReprovar, "btnAttention")
    );


    /* Grupos de Botões para cada tipo de ação */
    let buttons;


    if (acao.tipo === "proposta") {
        const assinaturasNecessarias = (acao.conteudoProposta?.assinaturas?.length || 0) > (acao.conteudoProposta?.assinaturasNecessarias || 0);
        const todosPareceres = acao.conteudoProposta?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== "");

        /* Quais botões mostrar em cada status */

        if (acao.statusAtual === "autor" && userAutor) {
            buttons = (
                <Link href={`/edit/acao/${acao.id}`}>
                    <button className="btnPrimary">
                        <p>Editar proposta</p>
                    </button>
                </Link>
            );
        }

        if (acao.statusAtual === "redacao" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Pautar", "Mover ação para a pauta?", "Para receber apoio dos deputados", acaoPautar, "btnPrimary")}
                    {modalButton("Solicitar ajustes", "Ajustes", <ModalSolicitarAjustes acaoId={acao.id} />, <></>, "btnPrimary")}
                    {reprovarButton}
                </>
            );
        }

        if (acao.statusAtual === "pauta") {
            buttons = (
                <>
                    {confirmButton("Assinar apoio", "Apoiar proposta?", "Sua assinatura será a favor dessa ação", acaoAssinarApoio, "btnPrimary")}
                    {(assinaturasNecessarias && userPresidente) && ({ encComissaoButton })}
                </>
            );
        }

        if (acao.statusAtual === "comissao" && userPresidente) {
            buttons = (
                <>
                    {/* userPresidenteComissao: Enviar parecer */}
                    {userPresidente && (
                        <>
                            {todosPareceres && (encPlenarioButton)}
                            {encComissaoButton}
                            {reprovarButton}
                        </>
                    )}
                </>
            );
        }

        if (acao.statusAtual === "plenario" && userPresidente) {
            buttons = (
                <>
                    {/* A votação aconteceu? */}
                    {/* SIM: aprovarButton + reprovarButton */}
                    {/* NÃO: Cadastrar votação */}
                </>
            );
        }
    }


    if (acao.tipo === "emenda") {
        const todosPareceres = acao.conteudoEmenda?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== "")

        /* Quais botões mostrar em cada status */

        if (acao.statusAtual === "autor" && userAutor) {
            buttons = (
                <Link href={`/edit/acao/${acao.id}`}>
                    <button className="btnPrimary">
                        <p>Editar proposta</p>
                    </button>
                </Link>
            );
        }

        if (acao.statusAtual === "redacao" && userPresidente) {
            buttons = (
                <>
                    {encComissaoButton}
                    {modalButton("Solicitar ajustes", "Ajustes", <ModalSolicitarAjustes acaoId={acao.id} />, <></>, "btnPrimary")}
                    {reprovarButton}
                </>
            );
        }

        if (acao.statusAtual === "comissao" && userPresidente) {
            buttons = (
                <>
                    {/* userPresidenteComissao: Enviar parecer */}
                    {userPresidente && (
                        <>
                            {todosPareceres && (encPlenarioButton)}
                            {encComissaoButton}
                            {reprovarButton}
                        </>
                    )}
                </>
            );
        }

        if (acao.statusAtual === "plenario" && userPresidente) {
            buttons = (
                <>
                    {/* A votação aconteceu? */}
                    {/* SIM: aprovarButton + reprovarButton */}
                    {/* NÃO: Cadastrar votação */}
                </>
            );
        }
    }


    if (acao.tipo === "licenca") {
        if (acao.statusAtual === "pendente" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Deferir", "Deferir pedido?", "Esse pedido de licença será aceito", () => { }, "btnSucess")}
                    {confirmButton("Indeferir", "Indeferir pedido?", "Esse pedido de licença será negado", acaoReprovar, "btnAttention")}
                </>
            );
        }
    }


    if (acao.tipo === "renuncia") {
        if (acao.statusAtual === "pendente" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Deferir", "Deferir pedido?", "Esse pedido de renúncia será aceito", () => { }, "btnSucess")}
                    {confirmButton("Indeferir", "Indeferir pedido?", "Esse pedido de renúncia será negado", acaoReprovar, "btnAttention")}
                </>
            );
        }
    }


    return (
        <div className="buttonsAcoes">
            {buttons}
            {showResponseModal}
        </div>
    );
}