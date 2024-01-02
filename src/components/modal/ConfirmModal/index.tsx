import { MouseEventHandler } from 'react'

import './style.scss'

type ModalProps = {
    title: string;
    text?: string;
    backButton: MouseEventHandler;
    actionButton: MouseEventHandler;
    actionButtonText: string;
}

export default function ConfirmModal(props: ModalProps) {

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
							<button
								className="btnPrimary"
								type="submit"
								onClick={props.actionButton}
							>
								<p>{props.actionButtonText}</p>
							</button>

							<button
								className="btnSecondary"
								onClick={props.backButton}
							>
								<p>Cancelar</p>
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}