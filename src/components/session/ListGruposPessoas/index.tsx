import CardGrupoPessoas from '@/components/card/CardGrupoPessoas';
import './style.scss';


type ListGruposPessoasProps = {
    userGroups: {
        id: number;
        nome: string;
        ativa: boolean;
        membros: {
            cim: string;
            nome: string;
            presidente: boolean;
        }[];
    }[];
}


export default function ListGruposPessoas(props: ListGruposPessoasProps) {
    return (
        <div className="listGruposPessoas">
            {props.userGroups.map((group, index) =>
                <CardGrupoPessoas key={index} group={group} />
            )}
        </div>
    )
}