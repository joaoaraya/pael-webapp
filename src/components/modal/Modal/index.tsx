import { MouseEventHandler, ReactNode } from 'react'
import Icon from '@/components/icon/Icon'

import './style.scss'

type ModalProps = {
    title: string;
    children: ReactNode; // Conteudo principal do Modal
    closeButton: MouseEventHandler;
    modalFooterContent?: ReactNode; // Conteudo no Rodapé do Modal
}

export default function Modal(props: ModalProps) {

    return (
        <>
            <div className="modalBG" />
            <div className="modal">
                <div className="modalContainer ">
                    <div className="modalContent">
                        <div className="modalHeader">
                            <h1>{props.title}</h1>
                            <button onClick={props.closeButton}>
                                <Icon nome="close" />
                            </button>
                        </div>

                        <div className="modalMain">
                            {props.children}
                        </div>

                        <div className="modalFooter">
                            {props.modalFooterContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}