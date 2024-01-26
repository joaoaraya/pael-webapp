import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import './style.scss';


type ModalProps = {
    acaoId: string;
}


export default function ModalRegistrarVotos(props: ModalProps) {
    const { handleSubmit } = useForm();
    const { post } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [votos, setVotos] = useState({ aFavor: 0, contra: 0, abstencao: 0 });


    const handleInputChange = (campo: string, valor: string) => {
        // Apenas dígitos de 0 a 9
        const regex = /^[0-9]*$/;

        // Validar inputs apenas para números de 0 a 9
        if (regex.test(valor)) {
            // Remover zeros à esquerda, exceto se o valor for apenas zero
            const votosApenasNumeros = valor.replace(/^0+(?!$)/, '');

            // Verificar se o valor é nulo e atribuir o mínimo de 0 (exceto se for maior que 0)
            setVotos({
                ...votos,
                [campo]: votosApenasNumeros === '' ||
                    parseInt(votosApenasNumeros, 10) === 0 ? '0' : votosApenasNumeros
            });
        }
    }

    const enviarVotos = async () => {
        try {
            const response = await post(
                `${API}/acao/${props.acaoId}/plenario/votos`,
                "application/json",
                JSON.stringify(votos)
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        } catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    return (
        <div className="modalRegistrarVotos">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="inputForms">
                    <label>
                        <p>Votos <b>a favor</b>:</p>

                        <input
                            className="inputText"
                            name="aFavor"
                            type="number"
                            value={votos.aFavor}
                            onChange={(e) => handleInputChange('aFavor', e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Votos <b>contra</b>:</p>

                        <input
                            className="inputText"
                            name="contra"
                            type="number"
                            value={votos.contra}
                            onChange={(e) => handleInputChange('contra', e.target.value)}
                        />
                    </label>

                    <label>
                        <p>Votos <b>abstenção</b>:</p>

                        <input
                            className="inputText"
                            name="abstencao"
                            type="number"
                            value={votos.abstencao}
                            onChange={(e) => handleInputChange('abstencao', e.target.value)}
                        />
                    </label>
                </div>

                <OpenConfirmModal
                    tagType="button"
                    className="btnPrimary"
                    title="Registrar votação do plenário?"
                    text="Não será possível alterá-los novamente"
                    action={handleSubmit(enviarVotos)}
                    actionText="Registrar votos"
                >
                    <p>Registrar votos</p>
                </OpenConfirmModal>
            </form>

            {showResponseModal}
        </div>
    )
}
