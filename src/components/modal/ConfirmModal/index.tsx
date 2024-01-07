import { useState, MouseEventHandler } from 'react';
import IconLoader from '@/components/icon/IconLoader';
import './style.scss';

type ModalProps = {
    title: string;
    text?: string;
    backButton: MouseEventHandler;
    actionButton: MouseEventHandler;
    actionButtonText: string;
}

export default function ConfirmModal(props: ModalProps) {
    const [disableButton, setDisableButton] = useState(false); // Inicializando como false para habilitar o botão

    const handleActionButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        // Aqui você pode adicionar a lógica para desabilitar o botão
        // Por exemplo, ao clicar no botão de ação, ele será desabilitado
        setDisableButton(true);

        // Além disso, você pode chamar o callback original, se necessário
        if (props.actionButton) {
            props.actionButton(event);
        }
    };

    return (
        <>
            <div className="confirmModalBG" />
            <div className="confirmModal">
                <div className="confirmModalContainer">
                    <div className="confirmModalContent">
                        <div className="confirmModalHeader">
                            <h1>{props.title}</h1>
                            <p>{props.text}</p>
                        </div>

                        <div className="confirmModalMain">
                            <button
                                id="action"
                                className="btnSecondary"
                                type="submit"
                                onClick={handleActionButtonClick} // Utilize a função criada para lidar com o clique do botão de ação
                            >
                                {disableButton ? <IconLoader /> : <p>{props.actionButtonText}</p>}
                            </button>

                            {disableButton ?
                                null
                                :
                                <button
                                    className="btnSecondary"
                                    onClick={props.backButton}
                                >
                                    <p>Cancelar</p>
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
