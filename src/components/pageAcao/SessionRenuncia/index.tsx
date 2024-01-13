'use client';

import './style.scss';


export default function SessionRenuncia() {

    const renuncia = (
        <div className="postTipoRenuncia">
            <div className="postData">
                <p><b>Solicitado em:</b> {dataDeCriacao} </p>
            </div>

            <div className="postTexto">
                <p>
                    <b>Pedido de Renúncia:</b>
                    <br />
                    {acao.conteudoRenuncia?.textoFormal}
                </p>
            </div>

            <div className="postAcoes">
                <div className="buttonsGrupo">
                    {/*O botão de ação muda de acordo com "status" e nivel de usuario*/}
                    <button className="btnPrimary aprovar">
                        <p>Deferir</p>
                    </button>

                    <button className="btnPrimary reprovar">
                        <p>Indeferir</p>
                    </button>
                </div>

                <div className="buttonsGrupo">
                    <button className="btnSecondary">
                        <p>Voltar</p>
                    </button>
                </div>
            </div>
        </div>
    );

    return (<></>)
}