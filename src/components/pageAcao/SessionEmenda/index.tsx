'use client';

import './style.scss';


export default function SessionEmenda() {

    const emenda = (
        <div className="postTipoEmenda">
            <div className="postInfo">
                <CardInfo
                    titulo={acao.conteudoEmenda?.info.titulo || ''}
                    descricao={acao.conteudoEmenda?.info.descricao || ''}
                />
            </div>

            <div className="postData">
                <p><b>Criado em:</b> {dataDeCriacao} </p>
                <p><b>Atualizado em:</b> {dataDeAtualizacao}</p>
            </div>

            <div className="postTexto">
                <p><b>Artigo:</b> {acao.conteudoEmenda?.textoArtigo}</p>
                <p><b>Proposta:</b> <br /> {acao.conteudoEmenda?.textoProposta}</p>
                <p><b>Justificativa:</b> <br /> {acao.conteudoEmenda?.textoJustificativa}</p>
            </div>

            <div className="postAcoes">
                <button className="btnSecondary">
                    <p>Voltar</p>
                </button>

                {/*O botão de ação muda de acordo com "status" e nivel de usuario*/}
                <button className="btnPrimary">
                    <img src="https://example.com/icone.png" alt="" />
                    <p>Encaminhar...</p>
                </button>
            </div>
        </div>
    );

    return (<></>)
}