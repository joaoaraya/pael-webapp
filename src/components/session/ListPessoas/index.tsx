import CardPessoa from '@/components/card/CardPessoa';
import './style.scss';


type ListPessoasProps = {
    users: {
        nome: string;
        cim: number;
        loja: string;
        lojaNumero: number;
        cargo: string;
        ativo: boolean;
        situacao: string;
        cpf?: string;
        email?: string;
        celular?: string;
        cimSuplente?: string;
        nomeSuplente?: string;
        cargos?: {
            nome: string;
            dataNomeacao: string;
            dataTermino: string;
        }[];
    }[];
    headerTextSelected: string;
    admin: boolean;
};


export default function ListPessoas(props: ListPessoasProps) {
    const labels = [
        { id: 'nome', text: 'Nome' },
        { id: 'cim', text: 'CIM' },
        { id: 'loja', text: 'Loja' },
        { id: 'lojaNumero', text: 'Nº Loja' },
        { id: 'cargo', text: 'Cargo' },
        { id: 'situacao', text: 'Situação' }
    ];


    return (
        <div className="listPessoas">
            <div className="tableHeader">
                <p />
                {labels.map((label, index) => (
                    <p key={index} className={props.headerTextSelected === label.id ? 'destaque' : ''}>
                        {label.text}
                    </p>
                ))}
            </div>

            <div className="tableData">
                {props.users.map((user, index) => (
                    <CardPessoa key={index} user={user} admin={props.admin} />
                ))}
            </div>
        </div>
    );
}
