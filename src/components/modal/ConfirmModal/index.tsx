import { useState, MouseEventHandler } from 'react';
import IconLoader from '@/components/icon/IconLoader';
import OpenConfirmPasswordModal from '@/components/button/OpenConfirmPasswordModal';
import './style.scss';


type ModalProps = {
    title: string;
    text?: string;
    backButton: MouseEventHandler;
    actionButton: MouseEventHandler;
    actionButtonText: string;
    withPassword?: boolean;
}


export default function ConfirmModal(props: ModalProps) {
    const [disableButton, setDisableButton] = useState(false);

    const handleActionButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        setDisableButton(true);

        if (props.actionButton && !disableButton) {
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
                            {props.withPassword ?
                                <OpenConfirmPasswordModal
                                    id="action"
                                    className="btnSecondary"
                                    tagType="button"
                                    action={handleActionButtonClick}
                                >
                                    <p>{props.actionButtonText}</p>
                                </OpenConfirmPasswordModal>
                                :
                                <button
                                    id="action"
                                    className="btnSecondary"
                                    type="submit"
                                    onClick={handleActionButtonClick}
                                >
                                    {disableButton ? <IconLoader /> : <p>{props.actionButtonText}</p>}
                                </button>
                            }

                            {!disableButton && (
                                <button
                                    className="btnSecondary"
                                    onClick={props.backButton}
                                >
                                    <p>Cancelar</p>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
