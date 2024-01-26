'use client';

import { ReactNode, useEffect, useState } from "react";
import { useAPI } from "@/hooks/Api";
import { API } from "@/functions/urls";
import Link from "next/link";
import OpenModal from "@/components/button/OpenModal";
import OpenConfirmModal from "@/components/button/OpenConfirmModal";
import ResponseModal from "@/components/modal/ResponseModal";
import ModalSolicitarAjustes from "@/components/modal/ModalSolicitarAjustes";
import ModalEncaminharComissao from "@/components/modal/ModalEncaminharComissao";
import ModalEnviarParecer from "@/components/modal/ModalEnviarParecer";
import ModalRegistrarVotos from "@/components/modal/ModalRegistrarVotos";
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

            plenarioVotos?: {};
        };

        conteudoEmenda?: {
            comissoesEncaminhadas?: {
                id: string;
                parecer: string;
            }[];

            plenarioVotos?: {};
        }
    }
}


export default function ButtonsAcoes(props: ButtonsAcoesProps) {
    const acao = props.acao;
    const [userPresidente, setUserPresidente] = useState(false);
    const [userPresidenteComissao, setUserPresidenteComissao] = useState(false);
    const [userAutor, setUserAutor] = useState(false);
    const { get, post, put, del } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);

    useEffect(() => {
        const checkUserIs = async () => {
            try {
                const responseAutor = await get(`${API}/check/user/autor/cim=${props.autor}`);
                const responsePresidente = await get(`${API}/check/user/presidente`);

                // Somente atualizar se a resposta for igual a "true"
                if (responseAutor.data === true) {
                    setUserAutor(true);
                }
                if (responsePresidente.data === true) {
                    setUserPresidente(true);
                }

                // Função para verificar se o usuário é presidente de alguma comissão
                const checkUserPresidenteComissao = async (comissaoId: string) => {
                    const response = await get(`${API}/check/user/presidente/comissao=${comissaoId}`);
                    return response.data === true;
                };

                // Verificar as comissões e definir o estado correspondente
                const checkComissoes = async (conteudo?: { comissoesEncaminhadas?: { id: string }[] }) => {
                    if (conteudo?.comissoesEncaminhadas) {
                        for (const comissao of conteudo.comissoesEncaminhadas) {
                            if (await checkUserPresidenteComissao(comissao.id)) {

                                setUserPresidenteComissao(true);
                                break;  // Se encontrou uma comissão, não precisa verificar as outras
                            }
                        }
                    }
                };

                checkComissoes(acao.conteudoProposta);
                checkComissoes(acao.conteudoEmenda);
            }
            catch (error: any) {
                console.error('Error:', error);
            }
        };

        checkUserIs();
    }, []);


    /* Ações botões de confirmação */
    const acaoAprovar = async () => {
        try {
            const response = await put(
                `${API}/acao/${acao.id}/status=concluido`,
                "application/json",
                JSON.stringify({ statusFinal: "aprovado" })
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
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
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const acaoExcluir = async () => {
        try {
            const response = await del(`${API}/acao/${acao.id}`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const acaoPautar = async () => {
        try {
            const response = await put(`${API}/acao/${acao.id}/status=pauta`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const acaoAssinarApoio = async () => {
        try {
            const response = await post(`${API}/acao/${acao.id}/pauta/assinatura`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const acaoEncPlenario = async () => {
        try {
            const response = await put(`${API}/acao/${acao.id}/status=plenario`);
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
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


    const editarPropostaButton = (
        <Link href={`/edit/acao/${acao.id}`}>
            <button className="btnPrimary">
                <p>Editar proposta</p>
            </button>
        </Link>
    );

    const solicitarAjustesButton = (
        modalButton("Solicitar ajustes", "Ajustes", <ModalSolicitarAjustes acaoId={acao.id} />, <></>, "btnPrimary")
    );

    const pautarButton = (
        confirmButton("Pautar", "Mover ação para a pauta?", "Para receber apoio dos deputados", acaoPautar, "btnPrimary")
    );

    const assinarApoioButton = (
        confirmButton("Assinar apoio", "Apoiar proposta?", "Sua assinatura será a favor dessa ação", acaoAssinarApoio, "btnPrimary")
    );

    const encComissaoButton = (
        modalButton("Enc. comissão", "Encaminhar para...", <ModalEncaminharComissao acaoId={acao.id} />, <></>, "btnPrimary")
    );

    const enviarParecerButton = (
        modalButton("Enviar parecer", "Parecer", <ModalEnviarParecer acaoId={acao.id} />, <></>, "btnPrimary")
    );

    const encPlenarioButton = (
        confirmButton("Enc. plenário", "Encaminhar ação para plenário?", "Essa proposta ficará disponível para votação", acaoEncPlenario, "btnPrimary")
    );

    const registrarVotos = (
        modalButton("Registrar votos", "Votação do plenário", <ModalRegistrarVotos acaoId={acao.id} />, <></>, "btnPrimary")
    );

    const aprovarButton = (
        confirmButton("Aprovar", "Aprovar ação?", "Essa proposta será finalizada", acaoAprovar, "btnSucess")
    );

    const reprovarButton = (
        confirmButton("Reprovar", "Reprovar ação?", "Essa proposta será finalizada", acaoReprovar, "btnAttention")
    );

    const excluirButton = (
        confirmButton("Excluir ação", "Excluir a ação?", "Todos os dados e progressos dessa ação serão perdidos!", acaoExcluir, "btnAttention")
    );


    /* Grupos de Botões para cada tipo de ação */
    let buttons;


    if (acao.tipo === "proposta") {
        const assinaturasNecessarias = (acao.conteudoProposta?.assinaturas?.length || 0) >= (acao.conteudoProposta?.assinaturasNecessarias || 0);
        const todosPareceres = acao.conteudoProposta?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== "");
        const votacaoConcluida = acao.conteudoProposta?.plenarioVotos;

        /* Quais botões mostrar em cada status */

        if (acao.statusAtual === "autor" && userAutor) {
            buttons = (editarPropostaButton);
        }

        if (acao.statusAtual === "redacao" && userPresidente) {
            buttons = (
                <>
                    {pautarButton}
                    {solicitarAjustesButton}
                    {reprovarButton}
                </>
            );
        }

        if (acao.statusAtual === "pauta") {
            buttons = (
                <>
                    {assinarApoioButton}
                    {(assinaturasNecessarias && userPresidente) && (encComissaoButton)}
                </>
            );
        }

        if (acao.statusAtual === "comissao") {
            buttons = (
                <>
                    {userPresidenteComissao && (enviarParecerButton)}
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
                    {!votacaoConcluida && (registrarVotos)}
                    {votacaoConcluida && (aprovarButton)}
                    {votacaoConcluida && (reprovarButton)}
                </>
            );
        }
    }


    if (acao.tipo === "emenda") {
        const todosPareceres = acao.conteudoEmenda?.comissoesEncaminhadas?.every(comissao => comissao.parecer !== "");
        const votacaoConcluida = acao.conteudoEmenda?.plenarioVotos;

        /* Quais botões mostrar em cada status */

        if (acao.statusAtual === "autor" && userAutor) {
            buttons = (editarPropostaButton);
        }

        if (acao.statusAtual === "redacao" && userPresidente) {
            buttons = (
                <>
                    {encComissaoButton}
                    {solicitarAjustesButton}
                    {reprovarButton}
                </>
            );
        }

        if (acao.statusAtual === "comissao") {
            buttons = (
                <>
                    {userPresidenteComissao && (enviarParecerButton)}
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
                    {!votacaoConcluida && (registrarVotos)}
                    {votacaoConcluida && (aprovarButton)}
                    {votacaoConcluida && (reprovarButton)}
                </>
            );
        }
    }


    if (acao.tipo === "licenca") {
        if (acao.statusAtual === "pendente" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Deferir", "Deferir pedido?", "Esse pedido de licença será aceito", acaoAprovar, "btnSucess")}
                    {confirmButton("Indeferir", "Indeferir pedido?", "Esse pedido de licença será negado", acaoReprovar, "btnAttention")}
                </>
            );
        }
    }


    if (acao.tipo === "renuncia") {
        if (acao.statusAtual === "pendente" && userPresidente) {
            buttons = (
                <>
                    {confirmButton("Deferir", "Deferir pedido?", "Esse pedido de renúncia será aceito", acaoAprovar, "btnSucess")}
                    {confirmButton("Indeferir", "Indeferir pedido?", "Esse pedido de renúncia será negado", acaoReprovar, "btnAttention")}
                </>
            );
        }
    }

    /* Se a ação estiver concluída, mostrar em todos os tipos */
    if (acao.statusAtual === "concluido" && userPresidente) {
        buttons = (excluirButton);
    }


    return (
        <div className="buttonsAcoes">
            {buttons}
            {showResponseModal}
        </div>
    );
}