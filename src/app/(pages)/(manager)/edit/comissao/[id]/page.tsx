"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';

import Icon from '@/components/icon/Icon';
import OpenModal from '@/components/button/OpenModal';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import ModalAdicionarMembro from '@/components/modal/ModalAdicionarMembro';
import ModalEditarTituloComissao from '@/components/modal/ModalEditarTituloComissao';
import LoadingPage from '@/components/session/LoadingPage';
import ErrorPage from '@/components/session/ErrorPage';

import './style.scss';


type PageProps = {
    id: string;
}

type ComissaoProps = {
    id: number;
    nome: string;
    ativa: boolean;
    membros: {
        cim: string;
        nome: string;
        presidente: boolean;
    }[];
}


export default function PageEditComissao({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { get, put, del } = useAPI();
    const [comissao, setComissao] = useState<ComissaoProps>();

    const comissaoID = params.id;

    useEffect(() => {
        const loadComissao = async () => {
            try {
                const response = await get(`${API}/comissao/${comissaoID}`);
                setComissao(response.data);
                setIsLoading(false);
            }
            catch (error: any) {
                setIsLoading(false);
            }
        }

        loadComissao();
    }, []);


    if (isLoading) {
        return (<LoadingPage />)
    }

    if (comissao) {
        // Ações dos botões
        const removerMembro = async (cim: string) => {
            try {
                const response = await del(`${API}/comissao/${comissao.id}/cim=${cim}`);
                setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
            }
            catch (error: any) {
                setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
            }
        }

        const ativarComissao = async (status: boolean) => {
            try {
                const response = await put(`${API}/comissao/${comissao.id}/ativa=${status}`);
                setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
            }
            catch (error: any) {
                setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
            }
        }


        // Botões
        const removerMembroButton = (cim: string) => (
            <OpenConfirmModal
                tagType="button"
                className="btnRemover"
                title="Remover membro da comissão?"
                action={() => removerMembro(cim)}
                actionText="Remover"
            >
                <Icon nome="close" />
            </OpenConfirmModal>
        );

        const adicionarMembroButton = (
            <OpenModal
                tagType="button"
                className="btnPrimary"
                modalTitle="Adicionar membro"
                modalContent={<ModalAdicionarMembro comissaoID={comissao.id} />}
            >
                <p>Adicionar membro</p>
            </OpenModal>
        );

        const escolherPresidenteButton = (
            <OpenModal
                tagType="button"
                className="btnPrimary"
                modalTitle="Escolher Presidente"
                modalContent={<ModalAdicionarMembro comissaoID={comissao.id} presidente={true} />}
            >
                <p>Escolher Presidente</p>
            </OpenModal>
        );

        const editarTituloButton = (
            <OpenModal
                tagType="button"
                className="btnPrimary"
                modalTitle="Editar título"
                modalContent={<ModalEditarTituloComissao comissao={comissao} />}
            >
                <p>Editar título</p>
            </OpenModal>
        );

        const inativarButton = (
            <OpenConfirmModal
                tagType="button"
                className="btnAttention"
                title="Inativar a comissão?"
                text="Será possível ativa-la novamente!"
                action={() => ativarComissao(false)}
                actionText="Inativar"
            >
                <p>Inativar comissão</p>
            </OpenConfirmModal>
        );

        const ativarButton = (
            <OpenConfirmModal
                tagType="button"
                className="btnSuccess"
                title="Ativar a comissão novamente?"
                action={() => ativarComissao(true)}
                actionText="Ativar"
            >
                <p>Ativar comissão</p>
            </OpenConfirmModal>
        );


        return (
            <div className="pageEditComissao">
                <div className="titulo">
                    <h1>{capitalize(comissao.nome)}</h1>
                </div>

                {comissao.membros.length > 0 ?
                    <div className="membros">
                        <div className="grupo">
                            <h2>Presidente</h2>

                            {comissao.membros.map((membro, index) =>
                                membro.presidente && (
                                    <div className="membro" key={index}>
                                        {removerMembroButton(membro.cim)}

                                        <img
                                            className="profilePicture"
                                            src={`${API}/user/${membro.cim}/picture/small`}
                                            alt=""
                                        />

                                        <p className="nome">{capitalize(membro.nome)}</p>
                                    </div>
                                )
                            )}
                        </div>

                        <div className="grupo">
                            <h2>Membros</h2>

                            {comissao.membros.map((membro, index) =>
                                !membro.presidente && (
                                    <div className="membro" key={index}>
                                        {removerMembroButton(membro.cim)}

                                        <img
                                            className="profilePicture"
                                            src={`${API}/user/${membro.cim}/picture/small`}
                                            alt=""
                                        />

                                        <p className="nome">{capitalize(membro.nome)}</p>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    :
                    <ErrorPage icon="group" title="Nenhum membro" text="Adicione novos membros à comissão!" />
                }

                <div className="botoes">
                    <div className="botoesGrupos">
                        {comissao.ativa ?
                            <>
                                {adicionarMembroButton}
                                {escolherPresidenteButton}
                                {editarTituloButton}
                                {inativarButton}
                            </>
                            :
                            <>
                                {ativarButton}
                            </>
                        }
                    </div>

                    <div className="botoesGrupos">
                        <button
                            className="btnSecondary"
                            onClick={() => router.push('/dashboard/comissoes')}
                        >
                            <p>Voltar</p>
                        </button>
                    </div>
                </div>

                {showResponseModal}
            </div>
        )
    }
}