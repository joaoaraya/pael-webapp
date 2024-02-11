'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import ConfirmModal from '@/components/modal/ConfirmModal'

type OpenConfirmModalProps = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    children: ReactNode;
    title: string;
    text?: string;
    action: MouseEventHandler;
    actionText: string;
    withPassword?: boolean;
}

export default function OpenConfirmModal(props: OpenConfirmModalProps) {
    const [showConfirmModal, setShowConfirmModal] = useState(false)

    const Tag = props.tagType //Tag Dinâmica (button, div, tr..)

    return (
        <>
            <Tag onClick={() => setShowConfirmModal(true)} className={props.className}>
                {props.children}
            </Tag>

            {showConfirmModal && (
                <ConfirmModal
                    title={props.title}
                    text={props.text}
                    backButton={() => setShowConfirmModal(false)}
                    actionButton={props.action}
                    actionButtonText={props.actionText}
                    withPassword={props.withPassword}
                />
            )}
        </>
    )
}
