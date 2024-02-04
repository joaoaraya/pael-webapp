"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import ButtonPessoa from '@/components/button/ButtonPessoa';
import LoadingPage from '@/components/session/LoadingPage';
import { capitalize } from '@/functions/visual';
import { getDate } from '@/functions/date';

import './style.scss';


type AutorProps = {
    nome: string;
    cim: string;
    loja: string;
    lojaNumero: string;
    cargo: string;
    ativo: boolean;
    situacao: string;
    dataNascimento?: string;
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


export default function PageNovaAcaoRenuncia() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const { register, handleSubmit } = useForm();
    const { get, post, put } = useAPI();
    const [autor, setAutor] = useState<AutorProps>();
    const [presidente, setPresidente] = useState<AutorProps>();
    const [data, setData] = useState({ motivo: '' });
    const dataAtual = getDate();


    useEffect(() => {
        const loadData = async () => {
            try {
                const responseAutor = await get(`${API}/user/me`);
                const responsePresidente = await get(`${API}/user/presidente`);

                setAutor(responseAutor.data);
                setPresidente(responsePresidente.data);

                setIsLoading(false);
            }
            catch (error: any) {
                setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
                setIsLoading(false);
            }
        }

        loadData();
    }, []);

    useEffect(() => {
        if (autor && presidente) {
            const carta = `Renúncia de Mandato à Poderosa Assembleia Estadual Legislativa do Grande Oriente do Brasil de São Paulo (PAEL GOB-SP).
            
            Ao Irmão,
            ${capitalize(presidente.nome)},
            Eminente Presidente da Poderosa Assembleia Estadual Legislativa do Grande Oriente do Brasil de São Paulo (PAEL GOB-SP).
            
            
            São Paulo-SP,
            
            Nome: ${capitalize(autor.nome)}, CIM: ${autor.cim}
            Loja: ${capitalize(autor.loja)}, número: ${autor.lojaNumero}
            
            Assunto: Pedido de Renúncia (art. 16 e 17, do RI).
            
            
            Eminente Presidente
            
            O signatário, acima identificado, requer ao Eminente Presidente, a renúncia do mandado parlamentar, nos termos do parágrafo único, do art. 20, do Regimento Interno, solicitando a convocação do Suplente, o Irmão ${capitalize(autor.nomeSuplente || '...')}, CIM: ${autor.cimSuplente || '...'}
            
            Pede e espera o deferimento.
            

            São Paulo, ${dataAtual.dia} de ${dataAtual.mes} de ${dataAtual.ano} da E.´.V.´.`;

            setData({ ...data, motivo: carta.replace(/\r?\n/g, "\n") });
        }

    }, [autor, presidente]);


    const sendData = async () => {
        try {
            const response = await post(`${API}/acao/tipo=renuncia`, 'application/json', JSON.stringify(data));

            if (response && response.status === 200) {
                const acaoID = response.data.details?.acao?.id;

                if (acaoID) {
                    setShowResponseModal(
                        <ResponseModal
                            icon={response.data.response}
                            message={response.data.message}
                            action={() => { router.push(`/acao/${acaoID}`) }}
                        />
                    )
                }
                else {
                    setShowResponseModal(<ResponseModal icon="error" message="Tente novamente ou mais tarde!" />);
                }
            }
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    const submitButton = (buttonText: string) => {
        return (
            <OpenConfirmModal
                tagType="button"
                className="btnPrimary"
                title="Solicitar Pedido de Renúncia?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    if (isLoading) {
        return (<LoadingPage />)
    }

    if (autor) {
        return (
            <div className="pageNovaAcaoRenuncia">
                <div className="titulo">
                    <h1>Novo Pedido De Renúncia</h1>
                </div>

                <div className="autor">
                    <p id="label">Deputado:</p>
                    <ButtonPessoa user={autor} />
                </div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="formalCard">
                        <p id="label">Carta de solicitação:</p>
                        <p id="content">{data.motivo}</p>
                    </div>

                    <div className="actionButtons">
                        {submitButton("Solicitar")}

                        <button className="btnSecondary" onClick={router.back}>
                            <p>Voltar</p>
                        </button>
                    </div>
                </form>

                {showResponseModal}
            </div>
        )
    }
}
