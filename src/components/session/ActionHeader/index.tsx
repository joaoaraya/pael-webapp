import { ReactNode } from 'react'
import './style.scss'

type ActionHeaderProps = {
    children?: ReactNode;
}

export default function ActionHeader(props: ActionHeaderProps) {
    return (
        <div className="actionHeader">
            {props.children}
        </div>
    )
}