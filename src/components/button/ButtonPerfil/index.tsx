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
        cim: string;
        loja: string;
        lojaNumero: string;
        cargo: string;
        ativo: boolean;
        situacao: string;
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
    const router = useRouter();

    const sair = () => {
        removeCookie('token');
        router.push('/');
    }


    let modalContent;
    let modalFooterContent;
    let modalFooterLinkButton;


    // Quando carregar os dados da API
    if (user) {
        fotoURL = user.cim ? `${API}/user/${user.cim}/picture/small` : defaultPicture.src;

        modalContent = (<ModalDeputado user={user} />);

        modalFooterLinkButton = {
            title: "Gerenciar",
            href: "/edit/user/me",
            closeModal: true
        }

        modalFooterContent = (
            <>
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
            modalTitle="Meus dados"
            modalContent={modalContent}
            modalFooterContent={modalFooterContent}
            modalFooterLinkButton={modalFooterLinkButton}
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

                {user?.cim !== "000000" && (
                    <p>
                        {user?.cim}
                        {cargo === "" ? "" : " • "}
                        {capitalize(cargo)}
                    </p>
                )}
            </div>
        </OpenModal>
    )
}
