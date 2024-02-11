import { useState, MouseEventHandler } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import IconLoader from '@/components/icon/IconLoader';
import ResponseModal from '../ResponseModal';
import './style.scss';


type ModalProps = {
    backButton: MouseEventHandler;
    actionButton: MouseEventHandler;
}


export default function ConfirmPasswordModal(props: ModalProps) {
    const { post } = useAPI();
    const [disableButton, setDisableButton] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordFail, setPasswordFail] = useState(false);


    const handleActionButtonClick: MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        setDisableButton(true);

        if (props.actionButton && !disableButton) {
            const validatePassword = await checkPassword();

            if (validatePassword) {
                props.actionButton(event);
            }
            else {
                setPasswordFail(true);
            }
        }
    }

    const checkPassword = async () => {
        try {
            const response = await post(`${API}/check/user/password`, 'application/json', JSON.stringify({ password: password }));
            return response.data;
        }
        catch (error: any) {
            // Ações de erro no hook de API
            return false;
        }
    }

    const tryAgain = () => {
        setPasswordFail(false)
        setDisableButton(false);
    }


    return (
        <>
            <div className="confirmPasswordModalBG" />
            <div className="confirmPasswordModal">
                <div className="confirmPasswordModalContainer">
                    <div className="confirmPasswordModalContent">
                        <div className="confirmPasswordModalHeader">
                            <h1>Digite sua senha:</h1>

                            <input
                                className="inputText"
                                type="password"
                                placeholder="******"
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="off"
                            />
                        </div>

                        <div className="confirmPasswordModalMain">
                            <button
                                id="action"
                                className="btnSecondary"
                                type="submit"
                                onClick={handleActionButtonClick}
                            >
                                {disableButton ? <IconLoader /> : <p>Confirmar</p>}
                            </button>

                            {!disableButton && (
                                <button
                                    className="btnSecondary"
                                    onClick={props.backButton}
                                >
                                    <p>Cancelar</p>
                                </button>
                            )}
                        </div>

                        {passwordFail && (
                            <ResponseModal icon="error" message="Senha incorreta!" action={tryAgain} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
