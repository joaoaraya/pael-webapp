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
        cim: string;
    };
}


export default function NavConta(props: NavProps) {
    const currentPath = usePathname();
    const router = useRouter();
    const [primeiroNome] = props.user.nome.split(' ');

    const options = [
        { title: 'Foto de perfil', param: '/foto' },
        { title: 'Dados pessoais', param: '/dados' },
        { title: 'Alterar senha', param: '/senha' },
        ...(props.isPresidente ? [
            { title: 'Situação', param: '/situacao' },
            { title: 'Cargos', param: '/cargos' },
        ] : [])
    ];

    const externaLinks = [
        { title: 'Solicitar licença', param: '/licenca' },
        { title: 'Solicitar renúncia', param: '/renuncia' }
    ];

    const newAcaoPath = '/new/acao/pedido/';
    const editUserPath = `/edit/user/${props.user.cim}`;

    const isCurrentPath = (path: string, param: string) => currentPath === path + param;
    const goToPath = (path: string, param: string) => !isCurrentPath(path, param) && router.push(path + param);

    const title = props.isAutor ? 'Minha Conta' : `Conta de ${capitalize(primeiroNome)}`;


    return (
        <div className="navConta">
            <div className="titulo">
                <h1>{title}</h1>
            </div>

            <div className="nav">
                {options.map((option, index) => (
                    <button
                        key={index}
                        className='btnSecondary btnSelect'
                        id={isCurrentPath(editUserPath, option.param) ? 'selected' : ''}
                        onClick={() => goToPath(editUserPath, option.param)}
                    >
                        <p>{option.title}</p>
                        <Icon nome="arrowRight" />
                    </button>
                ))}
            </div>

            {!props.isPresidente && (
                <div className="links">
                    {externaLinks.map((option, index) => (
                        <Link key={index} href={newAcaoPath + option.param}>
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