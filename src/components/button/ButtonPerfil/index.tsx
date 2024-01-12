import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';
import defaultPicture from '@/assets/images/defaultProfilePictureDark.png';
import OpenModal from '@/components/button/OpenModal';
import ModalDeputado from '@/components/modal/ModalDeputado';

import './style.scss';
import Link from 'next/link';



type ButtonPerfilProps = {
    user?: {
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


export default function ButtonPerfil(props: ButtonPerfilProps) {
    const user = props.user;


    const [withoutPicture, setWithoutPicture] = useState(false);
    const onImageLoadError = () => {
        setWithoutPicture(true);
    }
    let fotoURL = defaultPicture.src;

    const userNome = !user?.nome ? "" : user.nome;
    const userCargo = !user?.cargo ? "" : user.cargo;

    let [primeiroNome] = userNome.split(' ');
    let cargo = userCargo.length > 15 ? `${userCargo.substring(0, 15)}...` : userCargo;

    // Encerrar / Sair
    const [, , removeCookie] = useCookies(['token']);
    const Router = useRouter();

    const sair = () => {
        removeCookie('token');
        Router.push('/');
    }


    let modalContent = null;
    let modalFooterContent = null;


    // Quando carregar os dados da API
    if (user) {
        fotoURL = !user.cim ? defaultPicture.src : `${API}/user/${user.cim}/picture/small`;

        modalContent = (<ModalDeputado user={user} />);

        modalFooterContent = (
            <>
                <Link href={'/edit/deputado/' + user.cim}>
                    <button className="btnSecondary">
                        <p>Gerenciar</p>
                    </button>
                </Link>


                <button className="btnAttention" onClick={sair}>
                    <p>Encerrar</p>
                </button>
            </>
        );
    }


    return (
        <OpenModal
            tagType="button"
            className="buttonPerfil"
            modalTitle="Deputado"
            modalContent={modalContent}
            modalFooterContent={modalFooterContent}
        >
            <img
                id="fotoURL"
                src={fotoURL}
                alt=""
                onError={onImageLoadError}
                className={withoutPicture ? 'defaultPicture' : ''}
            />

            <div className="perfilDados">
                <h1>{capitalize(primeiroNome)}</h1>
                <p>
                    {user?.cim}
                    {cargo === "" ? "" : " • "}
                    {capitalize(cargo)}
                </p>
            </div>
        </OpenModal>
    )
}
