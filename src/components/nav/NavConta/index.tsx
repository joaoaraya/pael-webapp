import Link from "next/link";
import Icon from "@/components/icon/Icon";
import { capitalize } from "@/functions/visual";
import { usePathname, useRouter } from 'next/navigation';

import './style.scss';


type NavProps = {
    isPresidente: boolean;
    isAutor: boolean;
    user: {
        nome: string;
    }
}


export default function NavConta(props: NavProps) {
    const currentPath = usePathname();
    const router = useRouter();
    let [primeiroNome] = props.user.nome.split(' ');

    const options = [
        { title: 'Foto de perfil', path: '/foto' },
        { title: 'Dados pessoais', path: '/dados' },
        { title: 'Alterar senha', path: '/senha' }
    ];

    const optionsFull = [
        ...options,
        { title: 'Situação', path: '/situacao' },
        { title: 'Cargos', path: '/cargos' }
    ];

    const externaLinks = [
        { title: 'Solicitar licença', path: '/new/acao/pedido/licenca' },
        { title: 'Solicitar renúncia', path: '/new/acao/pedido/renuncia' }
    ];

    const showOptions = props.isPresidente ? optionsFull : options;
    const title = props.isAutor ? 'Minha conta' : `Conta de ${capitalize(primeiroNome)}`;


    return (
        <div className="navConta">
            <div className="titulo">
                <h1>{title}</h1>
            </div>

            <div className="nav">
                {showOptions.map((option, index) => (
                    <button
                        key={index}
                        className="btnSecondary btnSelect"
                        id=""
                        onClick={() => router.push(currentPath + option.path)}
                    >
                        <p>{option.title}</p>
                        <Icon nome="arrowRight" />
                    </button>

                ))}
            </div>

            {!(props.isPresidente) && (
                <div className="links">
                    {externaLinks.map((option, index) => (
                        <Link key={index} href={option.path}>
                            <button className="btnSecondary btnSelect">
                                <p>{option.title}</p>
                            </button>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
