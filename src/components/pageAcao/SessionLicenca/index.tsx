'use client';

import './style.scss';


export default function SessionLicenca() {

    const licenca = (
        <div className="postTipoLicenca">
            <div className="postData">
                <p><b>Solicitado em:</b> {dataDeCriacao} </p>
            </div>

            <div className="postTexto">
                <p><b>Motivo:</b> {acao.conteudoLicenca?.motivo}</p>
                <p><b>Tempo de afastamento: </b> {acao.conteudoLicenca?.diasAfastamento} dias</p>
                <p><b>Pedido de licença:</b> <br /> {acao.conteudoLicenca?.textoFormal}</p>
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