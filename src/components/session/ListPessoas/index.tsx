
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
}

export default function ListPessoas(props: ListPessoasProps) {
    return (
        <div className="listPessoas">
            <div className="tableHeader">
                <p />
                <p>Nome</p>
                <p>CIM</p>
                <p>Loja</p>
                <p>Nº Loja</p>
                <p>Cargo</p>
                <p>Situação</p>
            </div>

            <div className="tableData">
                {props.users.map((user, index) =>
                    <CardPessoa key={index} user={user} />
                )}
            </div>
        </div>
    )
}