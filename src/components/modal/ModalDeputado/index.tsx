import TextSituacao from '@/components/text/TextSituacao';
import { capitalize, formatCPF, formatDateISOToBR, formatPhoneNumber } from '@/functions/visual';
import { API } from '@/functions/urls';
import './style.scss';


type DeputadoProps = {
    user: {
        nome: string;
        cim: string;
        loja: string;
        lojaNumero: string;
        cargo: string;
        ativo: boolean;
        situacao: string;
        situacaoData: string;
        dataNascimento?: string;
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

    return (
        <div className="modalDeputado">
            <div id="apresentacao">
                <img className="profilePicture" src={fotoURL} alt="" />
                <p>{capitalize(user.nome)}</p>
            </div>

            {user.cim !== "000000" && (
                <div id="dados">
                    <p className="label">CIM</p>
                    <p>{user.cim}</p>

                    <p className="label">LOJA</p>
                    <p>{capitalize(user.loja)}</p>

                    <p className="label">Nº LOJA</p>
                    <p>{user.lojaNumero}</p>

                    <p className="label">SITUAÇÃO</p>
                    <TextSituacao ativo={user.ativo} situacao={capitalize(user.situacao)} />

                    <p className="label">DESDE</p>
                    <p>{formatDateISOToBR(user.situacaoData)}</p>

                    {user.dataNascimento && (
                        <>
                            <br />
                            <p className="label">DATA DE NASCIMENTO</p>
                            <p>{formatDateISOToBR(user.dataNascimento)}</p>
                        </>
                    )}

                    {user.cpf && (
                        <>
                            <p className="label">CPF</p>
                            <p>{formatCPF(user.cpf)}</p>
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
                            <p>{formatPhoneNumber(user.celular)}</p>
                        </>
                    )}

                    {user.nomeSuplente && (
                        <>
                            <br />
                            <p className="label">NOME DO SUPLENTE</p>
                            <p>{capitalize(user.nomeSuplente)}</p>
                        </>
                    )}

                    {user.cimSuplente && (
                        <>
                            <p className="label">CIM DO SUPLENTE</p>
                            <p>{user.cimSuplente}</p>
                            <br />
                        </>
                    )}

                    <p className="label">CARGO ATUAL</p>
                    <p>{capitalize(user.cargo || 'Nenhum')}</p>
                    <br />

                    {user.cargos && (
                        <>
                            {user.cargos.map((cargo) =>
                                <>
                                    <p className="label">
                                        CARGO DE <b>{formatDateISOToBR(cargo.dataNomeacao)}</b> A <b>{formatDateISOToBR(cargo.dataTermino)}</b>
                                    </p>
                                    <p>{capitalize(cargo.nome)}</p>
                                </>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    )
}