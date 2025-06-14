import { useState, useEffect } from 'react';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Icon from '@/components/icon/Icon';
import Link from 'next/link';
import './style.scss';


type NavigationOption = {
    icon: string;
    title: string;
    path: string;
}

type NavigationGroup = {
    title: string;
    options: NavigationOption[];
}


const navigation: NavigationGroup[] = [
    {
        title: '',
        options: [
            {
                icon: 'home',
                title: 'Início',
                path: '/dashboard',
            },
        ]
    },
    {
        title: 'Minhas',
        options: [
            {
                icon: 'dashboard',
                title: 'Tarefas',
                path: '/dashboard/minhas/tarefas',
            },
            {
                icon: 'dashboard',
                title: 'Ações',
                path: '/dashboard/minhas/acoes',
            }
        ]
    },
    {
        title: 'Ações em',
        options: [
            {
                icon: 'dashboard',
                title: 'Redação',
                path: '/dashboard/acoes/redacao',
            },
            {
                icon: 'dashboard',
                title: 'Pauta',
                path: '/dashboard/acoes/pauta',
            },
            {
                icon: 'dashboard',
                title: 'Comissão',
                path: '/dashboard/acoes/comissao',
            },
            {
                icon: 'dashboard',
                title: 'Plenário',
                path: '/dashboard/acoes/plenario',
            },
            {
                icon: 'dashboard',
                title: 'Concluídas',
                path: '/dashboard/acoes/concluido',
            },
        ]
    },
    {
        title: 'Lista de',
        options: [
            {
                icon: 'people',
                title: 'Deputados',
                path: '/dashboard/deputados',
            },
            {
                icon: 'group',
                title: 'Comissões',
                path: '/dashboard/comissoes',
            },
            {
                icon: 'doc',
                title: 'Documentos',
                path: '/dashboard/documentos',
            }
        ]
    }
];


export default function Navigation() {
    const [selectedPage, setSelectedPage] = useState<string>('');
    const [tarefasCounter, setTarefasCounter] = useState<number>(0);
    const { get } = useAPI();


    useEffect(() => {
        // Acessa o caminho atual diretamente do window.location
        const currentPath = window.location.pathname;

        // Encontra a opção de navegação correspondente ao caminho atual
        const matchingOption = navigation
            .flatMap((group) => group.options)
            .find((option) => option.path === currentPath);

        if (matchingOption) {
            setSelectedPage(matchingOption.title)
        }

        // Obeter quatidade de tarefas
        const loadMinhasTarefas = async () => {
            try {
                const response = await get(`${API}/acoes/to=me`);
                setTarefasCounter(response.data.length);
            }
            catch (error: any) {
                console.error('Error:', error);
            }
        }
        loadMinhasTarefas();
    }, []);


    return (
        <div className="navigation">
            {navigation.map((group, groupIndex) => (
                <div className="groups" key={groupIndex}>

                    <p className="groupTitle">{group.title}</p>

                    {group.options.map((option, optionIndex) => (
                        <Link
                            className="linkButton"
                            href={option.path}
                            key={optionIndex}
                        >
                            <button
                                className={selectedPage === option.title ? 'active' : ''}
                                onClick={() => setSelectedPage(option.title)}
                            >
                                <Icon nome={option.icon} />
                                <p>
                                    {option.title}
                                    {option.title === "Tarefas" ? tarefasCounter > 0 &&
                                        (<div id="iconNotification">
                                            <p>{tarefasCounter > 99 ? 99 : tarefasCounter}</p>
                                        </div>) : null
                                    }
                                </p>
                            </button>
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}
