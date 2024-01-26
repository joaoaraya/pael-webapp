import { useEffect, useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import LoadingCard from '@/components/session/LoadingCard';

import './style.scss';


type ModalProps = {
    acaoId: string;
}

type ComissoesProps = {
    id: number;
    nome: string;
    ativa: string;
}[];


export default function ModalEncaminharComissao(props: ModalProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [comissoes, setComissoes] = useState<ComissoesProps>();
    const { get, put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await get(`${API}/comissoes`);
                setComissoes(response.data);
                setIsLoading(false);
            }
            catch (error: any) {
                console.error('Error:', error);
                setIsLoading(false);
            }
        }

        loadData();
    }, []);


    const encaminharParaComissao = async (id: number) => {
        try {
            const response = await put(
                `${API}/acao/${props.acaoId}/status=comissao`,
                "application/json",
                JSON.stringify({ id_comissao: id })
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    if (isLoading) {
        return (<LoadingCard />)
    }

    if (comissoes) {
        return (
            <div className="modalEncaminharComissao">
                {comissoes.map((comissao, index) =>
                    comissao.ativa && (
                        <OpenConfirmModal
                            key={index}
                            tagType="button"
                            className="btnSecondary"
                            title={`Encaminhar ação para a ${capitalize(comissao.nome)}?`}
                            action={() => encaminharParaComissao(comissao.id)}
                            actionText="Encaminhar"
                        >
                            <p>{capitalize(comissao.nome)}</p>
                        </OpenConfirmModal>
                    )
                )}

                {showResponseModal}
            </div>
        )
    }
}
