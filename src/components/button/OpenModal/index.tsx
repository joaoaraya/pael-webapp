'use client'

import { ReactNode, useState } from 'react'
import Modal from '@/components/modal/Modal'

type OpenModalProps = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    children: ReactNode;
    modalTitle: string;
    modalContent: ReactNode;
    modalFooterContent?: ReactNode;
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
                    modalFooterContent={props.modalFooterContent}
                >
                    {props.modalContent}
                </Modal>
            )}
        </>
    )
}
