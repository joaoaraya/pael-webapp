import React, { useState } from 'react';
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';
import defaultPicture from '@/assets/images/defaultProfilePictureDark.png';
import OpenModal from '@/components/button/OpenModal';
import ModalDeputado from '@/components/modal/ModalDeputado';

import './style.scss';


type ButtonPerfilProps = {
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


export default function ButtonPerfil(props: ButtonPerfilProps) {
    const user = props.user;
    const fotoURL = !user.cim ? defaultPicture.src : `${API}/user/${user.cim}/picture/small`;

    const [withoutPicture, setWithoutPicture] = useState(false);
    const onImageLoadError = () => {
        setWithoutPicture(true);
    }

    const userNome = !user.nome ? "" : user.nome;
    const userCargo = !user.cargo ? "" : user.cargo;

    const [primeiroNome] = userNome.split(' ');
    const cargo = userCargo.length > 15 ? `${userCargo.substring(0, 15)}...` : userCargo;


    const modalContent = (
        <ModalDeputado user={user} />
    );

    const modalFooterContent = (
        <div>
            <button className="btnPrimary">
                <p>Editar</p>
            </button>
        </div>
    );


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
                    {user.cim}
                    {cargo === "" ? "" : " • "}
                    {capitalize(cargo)}
                </p>
            </div>
        </OpenModal>
    )
}
