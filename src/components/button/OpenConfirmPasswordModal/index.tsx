'use client';

import { MouseEventHandler, ReactNode, useState } from 'react';
import ConfirmPasswordModal from '@/components/modal/ConfirmPasswordModal';

type Props = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    id?: string;
    children: ReactNode;
    action: MouseEventHandler;
}

export default function OpenConfirmPasswordModal(props: Props) {
    const [showModal, setShowModal] = useState(false)

    const Tag = props.tagType //Tag Dinâmica (button, div, tr..)

    return (
        <>
            <Tag onClick={() => setShowModal(true)} className={props.className} id={props.id}>
                {props.children}
            </Tag>

            {showModal && (
                <ConfirmPasswordModal
                    backButton={() => setShowModal(false)}
                    actionButton={props.action}
                />
            )}
        </>
    )
}
