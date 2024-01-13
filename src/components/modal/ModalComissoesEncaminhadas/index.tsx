import { capitalize } from '@/functions/visual';
import Icon from '@/components/icon/Icon';
import './style.scss';


type ComissoesProps = {
    comissoes: {
        id: string;
        nome: string;
        parecer: string;
    }[];
}


export default function ModalComissoesEncaminhadas(props: ComissoesProps) {
    return (
        <div className="modalComissoesEncaminhadas">

            <div className="grupo">
                <h2>Com parecer</h2>
                {props.comissoes.map((comissao, index) =>
                    comissao.parecer !== "" && (
                        <div className="comissao" key={index}>

                            <div className={`icone ${comissao.parecer}`} title={comissao.parecer}>
                                {comissao.parecer === "aprovado" && (<Icon nome="like" />)}
                                {comissao.parecer === "reprovado" && (<Icon nome="dislike" />)}
                            </div>

                            <p className="nome">{capitalize(comissao.nome)}</p>
                        </div>
                    )
                )}
            </div>

            <div className="grupo">
                <h2>Aguardando parecer</h2>
                {props.comissoes.map((comissao, index) =>
                    comissao.parecer === "" && (
                        <div className="comissao" key={index}>

                            <div className="icone">
                                <Icon nome="wait" />
                            </div>

                            <p className="nome">{capitalize(comissao.nome)}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}