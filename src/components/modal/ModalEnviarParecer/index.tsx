import { useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import Icon from '@/components/icon/Icon';
import './style.scss';


type ModalProps = {
    acaoId: string;
}


export default function ModalEnviarParecer(props: ModalProps) {
    const { post } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);

    const enviarParecer = async (parecer: string) => {
        try {
            const response = await post(
                `${API}/acao/${props.acaoId}/comissao/parecer`,
                "application/json",
                JSON.stringify({ parecer: parecer })
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    return (
        <div className="modalEnviarParecer">
            <p className="desc">Para a comissão, essa proposta está:</p>

            <OpenConfirmModal
                tagType="button"
                className="btnSuccess btnParecer"
                title="Aprovar essa proposta para o Presidente?"
                action={() => enviarParecer("aprovado")}
                actionText="Aprovar"
            >
                <Icon nome="like" />
                <p>Aprovada</p>
            </OpenConfirmModal>

            <OpenConfirmModal
                tagType="button"
                className="btnAttention btnParecer"
                title="Reprovar essa proposta para o Presidente?"
                action={() => enviarParecer("reprovado")}
                actionText="Reprovar"
            >
                <Icon nome="dislike" />
                <p>Reprovada</p>
            </OpenConfirmModal>

            {showResponseModal}
        </div>
    );
}
