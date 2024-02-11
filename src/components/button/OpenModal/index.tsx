'use client';

import { ReactNode, useState } from 'react';
import Modal from '@/components/modal/Modal';


type OpenModalProps = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    children: ReactNode;
    modalTitle: string;
    modalContent: ReactNode;
    modalFooterContent?: ReactNode;
    modalFooterLinkButton?: {
        title: string;
        href: string;
        closeModal?: boolean;
    }
}


export default function OpenModal(props: OpenModalProps) {
    const [showModal, setShowModal] = useState(false)

    const Tag = props.tagType //Tag Dinâmica (button, div, tr..)

    return (
        <>
            <Tag onClick={() => setShowModal(true)} className={props.className}>
                {props.children}
            </Tag>

            {showModal && (
                <Modal
                    title={props.modalTitle}
                    closeButton={() => setShowModal(false)}
                    footerContent={props.modalFooterContent}
                    footerLinkButton={props.modalFooterLinkButton}
                >
                    {props.modalContent}
                </Modal>
            )}
        </>
    )
}
