import React from 'react'

/* Tipagem */
type IconProps = {
    nome: string;
}

type IconMapType = {
    [key: string]: React.ReactNode;
}

/* Definições Padrões do SVG */
const iconDefault = {
    size: '8px',
    color: '#000000'
}

/* Lista de Icones */
const iconDashboard = (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
    </svg>
)

const iconPeople = (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </svg>
)

const iconGroup = (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="0 0 24 24" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color}>
        <rect fill="none" height="24" width="24" />
        <g>
            <path d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z" />
        </g>
    </svg>
)

const iconDoc = (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0z" fill="none" /><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
    </svg>
)

const iconHistory = (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" />
    </svg>
)

const iconClose = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z" />
    </svg>
)

const iconInfo = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
)

const iconSearch = (
    <svg width={iconDefault.size} height={iconDefault.size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.62865 15.2573C3.42359 15.2573 0 11.8337 0 7.62865C0 3.42359 3.42359 0 7.62865 0C11.8337 0 15.2573 3.42359 15.2573 7.62865C15.2573 11.8337 11.8337 15.2573 7.62865 15.2573ZM7.62865 1.11639C4.03388 1.11639 1.11639 4.04133 1.11639 7.62865C1.11639 11.216 4.03388 14.1409 7.62865 14.1409C11.2234 14.1409 14.1409 11.216 14.1409 7.62865C14.1409 4.04133 11.2234 1.11639 7.62865 1.11639Z" fill={iconDefault.color} />
        <path d="M18.2172 18.5517C18.0758 18.5517 17.9343 18.4996 17.8227 18.388L12.7111 13.2889C12.4953 13.0731 12.4953 12.7158 12.7111 12.5C12.9269 12.2842 13.2842 12.2842 13.5 12.5L18.6116 17.5991C18.8275 17.8149 18.8275 18.1721 18.6116 18.388C18.5 18.4996 18.3586 18.5517 18.2172 18.5517Z" fill={iconDefault.color} />
    </svg>
)

const iconOptions = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M3 18c0 .55.45 1 1 1h5v-2H4c-.55 0-1 .45-1 1zM3 6c0 .55.45 1 1 1h9V5H4c-.55 0-1 .45-1 1zm10 14v-1h7c.55 0 1-.45 1-1s-.45-1-1-1h-7v-1c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1s1-.45 1-1zM7 10v1H4c-.55 0-1 .45-1 1s.45 1 1 1h3v1c0 .55.45 1 1 1s1-.45 1-1v-4c0-.55-.45-1-1-1s-1 .45-1 1zm14 2c0-.55-.45-1-1-1h-9v2h9c.55 0 1-.45 1-1zm-5-3c.55 0 1-.45 1-1V7h3c.55 0 1-.45 1-1s-.45-1-1-1h-3V4c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .55.45 1 1 1z" />
    </svg>
)

const iconMenu = (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
)

const iconEdit = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    </svg>
)

const iconSun = (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <rect fill="none" height={iconDefault.size} width={iconDefault.size} />
        <path d="M12,7c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S14.76,7,12,7L12,7z M2,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0 c-0.55,0-1,0.45-1,1S1.45,13,2,13z M20,13l2,0c0.55,0,1-0.45,1-1s-0.45-1-1-1l-2,0c-0.55,0-1,0.45-1,1S19.45,13,20,13z M11,2v2 c0,0.55,0.45,1,1,1s1-0.45,1-1V2c0-0.55-0.45-1-1-1S11,1.45,11,2z M11,20v2c0,0.55,0.45,1,1,1s1-0.45,1-1v-2c0-0.55-0.45-1-1-1 C11.45,19,11,19.45,11,20z M5.99,4.58c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41l1.06,1.06 c0.39,0.39,1.03,0.39,1.41,0s0.39-1.03,0-1.41L5.99,4.58z M18.36,16.95c-0.39-0.39-1.03-0.39-1.41,0c-0.39,0.39-0.39,1.03,0,1.41 l1.06,1.06c0.39,0.39,1.03,0.39,1.41,0c0.39-0.39,0.39-1.03,0-1.41L18.36,16.95z M19.42,5.99c0.39-0.39,0.39-1.03,0-1.41 c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L19.42,5.99z M7.05,18.36 c0.39-0.39,0.39-1.03,0-1.41c-0.39-0.39-1.03-0.39-1.41,0l-1.06,1.06c-0.39,0.39-0.39,1.03,0,1.41s1.03,0.39,1.41,0L7.05,18.36z" />
    </svg>
)

const iconMoon = (
    <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <rect fill="none" height={iconDefault.size} width={iconDefault.size} />
        <path d="M9.37,5.51C9.19,6.15,9.1,6.82,9.1,7.5c0,4.08,3.32,7.4,7.4,7.4c0.68,0,1.35-0.09,1.99-0.27C17.45,17.19,14.93,19,12,19 c-3.86,0-7-3.14-7-7C5,9.07,6.81,6.55,9.37,5.51z M12,3c-4.97,0-9,4.03-9,9s4.03,9,9,9s9-4.03,9-9c0-0.46-0.04-0.92-0.1-1.36 c-0.98,1.37-2.58,2.26-4.4,2.26c-2.98,0-5.4-2.42-5.4-5.4c0-1.81,0.89-3.42,2.26-4.4C12.92,3.04,12.46,3,12,3L12,3z" />
    </svg>
)

const iconCamera = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height={iconDefault.size} width={iconDefault.size} fill={iconDefault.color}>
        <path d="M0 0h24v24H0V0z" fill="none" />
        <circle cx="12" cy="12" r="3" />
        <path d="M20 4h-3.17l-1.24-1.35c-.37-.41-.91-.65-1.47-.65H9.88c-.56 0-1.1.24-1.48.65L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-8 13c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" />
    </svg>
)

const iconNone = (
    <svg xmlns="http://www.w3.org/2000/svg" height={iconDefault.size} viewBox="0 0 24 24" width={iconDefault.size} fill={iconDefault.color} />
)

/* Lista de icones convertidos de String para o Const correspondente em SVG */
const iconMap: IconMapType = {
    'dashboard': iconDashboard,
    'people': iconPeople,
    'group': iconGroup,
    'doc': iconDoc,
    'history': iconHistory,
    'close': iconClose,
    'info': iconInfo,
    'search': iconSearch,
    'options': iconOptions,
    'menu': iconMenu,
    'edit': iconEdit,
    'sun': iconSun,
    'moon': iconMoon,
    'camera': iconCamera,
    'none': iconNone
}

export default function Icon(props: IconProps) {

    /* Verifica se o nome fornecido existe no mapeamento de ícones */
    if (props.nome in iconMap) {
        return iconMap[props.nome]
    }
    else {
        return iconNone
    }
}