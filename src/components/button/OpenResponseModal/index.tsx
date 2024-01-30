'use client';

import ResponseModal from '@/components/modal/ResponseModal';
import { ReactNode, useState } from 'react';


type OpenConfirmModalProps = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    children: ReactNode;
    icon: string;
    message: string;
}

export default function OpenResponseModal(props: OpenConfirmModalProps) {
    const [showResponseModal, setShowResponseModal] = useState(false)

    const Tag = props.tagType //Tag Dinâmica (button, div, tr..)

    return (
        <>
            <Tag onClick={() => setShowResponseModal(true)} className={props.className}>
                {props.children}
            </Tag>

            {showResponseModal && (
                <ResponseModal
                    icon={props.icon}
                    message={props.message}
                    action={() => { setShowResponseModal(false) }}
                />
            )}
        </>
    )
}
