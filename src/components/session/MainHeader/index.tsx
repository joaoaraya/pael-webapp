import { ReactNode } from 'react'
import './style.scss'

type MainHeaderProps = {
    title: string;
    counter?: number;
    children?: ReactNode;
}

export default function MainHeader({ counter = 0, ...props }: MainHeaderProps) {
    return (
        <div className="mainHeader">
            <div id="pageTitulo">
                <h1>{props.title}</h1>
                {counter > 0 && (<div id="counter"><p>{counter}</p></div>)}
            </div>
            {props.children}
        </div>
    )
}