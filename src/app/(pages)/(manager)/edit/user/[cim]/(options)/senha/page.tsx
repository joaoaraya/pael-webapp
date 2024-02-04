"use client";


//import './style.scss';

export default function PageEditUserOption() {
    return (
        <div className="pageEditUserOption">
            <div className="titulo">
                <h1>Foto de Perfil</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <label className="inputLabel">
                    <p>Artigo:</p>

                    <input
                        type="text"
                        className="inputText"
                        placeholder="Digite o artigo"
                        maxLength={64}
                    />
                </label>

                <label className="inputLabel">
                    <p>Artigo:</p>

                    <input
                        type="text"
                        className="inputText"
                        placeholder="Digite o artigo"
                        maxLength={64}
                    />
                </label>

                <label className="inputLabel">
                    <p>Artigo:</p>

                    <input
                        type="text"
                        className="inputText"
                        placeholder="Digite o artigo"
                        maxLength={64}
                    />
                </label>

                <label className="inputLabel">
                    <p>Artigo:</p>

                    <input
                        type="text"
                        className="inputText"
                        placeholder="Digite o artigo"
                        maxLength={64}
                    />
                </label>
            </form>
        </div>
    );
}
