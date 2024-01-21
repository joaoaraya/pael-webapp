import { useEffect, useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';

import './style.scss';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';


type ComissoesProps = {
    id: number;
    nome: string;
    ativa: string;
}[];


export default function ModalEncaminharComissao() {
    const [isLoading, setIsLoading] = useState(true);
    const [comissoes, setComissoes] = useState<ComissoesProps>();
    const { get } = useAPI();

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

    const encaminharParaComissao = () => { };


    if (isLoading) {
        return (<>Carregando...</>)
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
                            action={encaminharParaComissao}
                            actionText="Encaminhar"
                        >
                            <p>{capitalize(comissao.nome)}</p>
                        </OpenConfirmModal>
                    )
                )}
            </div>
        )
    }
}
