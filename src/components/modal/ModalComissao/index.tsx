import React from 'react';
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';

import './style.scss';

type ComissaoProps = {
    comissao: {
        id: number;
        nome: string;
        ativa: boolean;
        membros: {
            cim: string;
            nome: string;
            presidente: boolean;
        }[];
    };
};

export default function ModalComissao(props: ComissaoProps) {
    const comissao = props.comissao;

    return (
        <div className="modalComissao">
            <h1>{capitalize(comissao.nome)}</h1>

            {comissao.membros.length > 0 ?
                <>
                    <div className="grupo">
                        <h2>Presidente</h2>

                        {comissao.membros.map((membro, index) =>
                            membro.presidente && (
                                <div className="membro" key={index}>
                                    <img
                                        className="profilePicture"
                                        src={`${API}/user/${membro.cim}/picture/small`}
                                        alt=""
                                    />

                                    <p>{capitalize(membro.nome)}</p>
                                </div>
                            )
                        )}
                    </div>

                    <div className="grupo">
                        <h2>Membros</h2>

                        {comissao.membros.map((membro, index) =>
                            !membro.presidente && (
                                <div className="membro" key={index}>
                                    <img
                                        className="profilePicture"
                                        src={`${API}/user/${membro.cim}/picture/small`}
                                        alt=""
                                    />

                                    <p>{capitalize(membro.nome)}</p>
                                </div>
                            )
                        )}
                    </div>
                </>
                :
                <div className="grupo">
                    <h2>Nenhum Membro</h2>
                </div>
            }
        </div>
    );
}
