import { MouseEventHandler, ReactNode } from 'react';
import Icon from '@/components/icon/Icon';

import './style.scss';
import Link from 'next/link';


type ModalProps = {
    title: string;
    children: ReactNode; // Conteudo principal do Modal
    closeButton: MouseEventHandler;
    footerContent?: ReactNode; // Conteudo no Rodapé do Modal
    footerLinkButton?: {
        title: string;
        href: string;
        closeModal?: boolean;
    }
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
                            {props.footerLinkButton && (
                                <Link href={props.footerLinkButton.href}>
                                    <button
                                        className="btnSecondary"
                                        onClick={props.footerLinkButton.closeModal ? props.closeButton : () => { }}
                                    >
                                        <p>{props.footerLinkButton.title}</p>
                                    </button>
                                </Link>
                            )}

                            {props.footerContent}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}