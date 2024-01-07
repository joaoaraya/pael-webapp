import { useState } from 'react';
import TextSituacao from '@/components/text/TextSituacao';
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';
import './style.scss';

type DeputadoProps = {
    user: {
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
    };
}

export default function ModalDeputado(props: DeputadoProps) {
    const user = props.user;
    const fotoURL = `${API}/user/${user.cim}/picture/large`;

    const [withoutPicture, setWithoutPicture] = useState(false);
    const onImageLoadError = () => {
        setWithoutPicture(true);
    }

    return (
        <div className="modalDeputado">
            <div id="apresentacao">
                <img
                    id="fotoURL"
                    src={fotoURL}
                    alt=""
                    onError={onImageLoadError}
                    className={withoutPicture ? 'defaultPicture' : ''}
                />
                <p>{capitalize(user.nome)}</p>
            </div>

            <div id="dados">
                <p className="label">CIM</p>
                <p>{user.cim}</p>

                <p className="label">LOJA</p>
                <p>{capitalize(user.loja)}</p>

                <p className="label">Nº LOJA</p>
                <p>{user.lojaNumero}</p>

                <p className="label">SITUAÇÃO</p>
                <TextSituacao ativo={user.ativo} situacao={capitalize(user.situacao)} />

                {user.cpf && (
                    <>
                        <br />
                        <p className="label">CPF</p>
                        <p>{user.cpf}</p>
                    </>
                )}

                {user.email && (
                    <>
                        <p className="label">EMAIL</p>
                        <p>{user.email}</p>
                    </>
                )}

                {user.celular && (
                    <>
                        <p className="label">CELULAR</p>
                        <p>{user.celular}</p>
                    </>
                )}

                {user.cimSuplente && (
                    <>
                        <br />
                        <p className="label">CIM DO SUPLENTE</p>
                        <p>{user.cimSuplente}</p>
                    </>
                )}

                {user.nomeSuplente && (
                    <>
                        <p className="label">NOME DO SUPLENTE</p>
                        <p>{capitalize(user.nomeSuplente)}</p>
                        <br />
                    </>
                )}

                <p className="label">CARGO ATUAL</p>
                <p>{capitalize(user.cargo || 'Nenhum')}</p>

                {user.cargos && (
                    <>
                        {user.cargos.map((cargo) =>
                            <>
                                <p className="label">DE {cargo.dataNomeacao} A {cargo.dataTermino}</p>
                                <p>{capitalize(cargo.nome || 'Nenhum')}</p>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}