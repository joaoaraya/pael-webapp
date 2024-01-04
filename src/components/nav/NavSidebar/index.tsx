import { MouseEventHandler, ReactNode, useState } from 'react'
import Icon from '@/components/icon/Icon'

import './style.scss'

type NavSidebar = {
    showSidebar: boolean;
    closeButton: MouseEventHandler;
    children: ReactNode; // Conteudo dentro da sidebar
}

export default function NavSidebar(props: NavSidebar) {

    return (
        <>
            <div className="sidebarBG" />
            <div className={`navSidebar ${props.showSidebar ? 'open' : ''}`}>
                <div className="sidebarHeader">
                    <button onClick={props.closeButton}>
                        <Icon nome="close" />
                    </button>
                </div>

                <div className="sidebarMain">
                    {props.children}
                </div>
            </div>
        </>
    )
}
