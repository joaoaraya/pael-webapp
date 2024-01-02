'use client'

import { MouseEventHandler, ReactNode, useState } from 'react'
import ConfirmModal from '@/components/modal/ConfirmModal'

type OpenConfirmModalProps = {
    tagType: keyof JSX.IntrinsicElements;
    className?: string;
    children: ReactNode;
    confirmModalTitle: string;
    confirmModalText?: string;
    confirmModalAction: MouseEventHandler;
    confirmModalActionText: string;
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
					title={props.confirmModalTitle}
					text={props.confirmModalText}
					backButton={() => setShowConfirmModal(false)}
					actionButton={props.confirmModalAction}
					actionButtonText={props.confirmModalActionText}
				/>
			)}
		</>
	)
}
