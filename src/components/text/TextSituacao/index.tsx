import './style.scss';

type TextSituacaoProps = {
    ativo: boolean;
    situacao: string;
}

export default function TextSituacao(props: TextSituacaoProps) {
    return (
        <p className={`textSituacao ${props.ativo ? 'ativo' : 'inativo'}`}>

            <span id="icone" />
            {props.situacao}
        </p>
    )
}