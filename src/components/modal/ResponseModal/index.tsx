import { useState, MouseEventHandler } from 'react';
import Icon from '@/components/icon/Icon';
import './style.scss';


type ModalProps = {
    icon: string;
    message: string;
    action?: MouseEventHandler;
}


export default function ResponseModal(props: ModalProps) {
    const [disableButton, setDisableButton] = useState(false);

    const handleActionButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        setDisableButton(true);

        if (props.action && !disableButton) {
            props.action(event);
        }
        else {
            // A função padrão do botão ok é recarregar a página
            location.reload();
        }
    };

    return (
        <>
            <div className="responseModalBG" />
            <div className="responseModal">
                <div className="responseModalContainer">
                    <div className="responseModalContent">
                        <div className={'icon ' + props.icon}>
                            <Icon nome={props.icon} />
                        </div>

                        <div className="message">
                            <p>{props.message}</p>
                        </div>

                        <div className="action">
                            <button
                                id="action"
                                className="btnSecondary"
                                type="submit"
                                onClick={handleActionButtonClick}
                            >
                                <p>OK</p>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
