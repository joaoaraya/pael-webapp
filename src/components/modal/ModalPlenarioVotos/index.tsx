import { capitalize } from '@/functions/visual';
import Icon from '@/components/icon/Icon';
import './style.scss';
import GraphPizzaVotos from '@/components/graphs/GraphPizzaVotos';


type PlanarioProps = {
    votos?: {
        aFavor: number;
        contra: number;
        abstencao: number
    }
}


export default function ModalPlenarioVotos(props: PlanarioProps) {
    if (props.votos) {
        const votos = props.votos;
        const votosTotal = votos.aFavor + votos.contra + votos.abstencao;

        // Calcular Porcentagens
        const porcentagemAfavor = Math.round((votos.aFavor / votosTotal) * 100);
        const porcentagemContra = Math.round((votos.contra / votosTotal) * 100);
        const porcentagemAbstencao = Math.round((votos.abstencao / votosTotal) * 100);


        return (
            <div className="modalPlenarioVotos">

                <GraphPizzaVotos aFavor={porcentagemAfavor} contra={porcentagemContra} />

                <div className="votos">
                    <div className="icones">
                        <div id="afavor">
                            <Icon nome="like" />
                            <p>{porcentagemAfavor}%</p>
                        </div>

                        <div id="contra">
                            <Icon nome="dislike" />
                            <p>{porcentagemContra}%</p>
                        </div>

                        <div id="abstencao">
                            <Icon nome="a" />
                            <p>{porcentagemAbstencao}%</p>
                        </div>
                    </div>

                    <hr />

                    <div className="resultados">
                        <p>Votos a favor: <b>{votos.aFavor}</b></p>
                        <p>Votos contra: <b>{votos.contra}</b></p>
                        <p>Votos abstenção: <b>{votos.abstencao}</b></p>
                    </div>

                </div>
            </div>
        )
    }
}