import { useEffect, useState } from 'react';
import { capitalize } from '@/functions/visual';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';
import Link from 'next/link';

import OpenModal from '@/components/button/OpenModal';
import ModalComissao from '@/components/modal/ModalComissao';

import './style.scss';


type CardGrupoPessoasProps = {
    group: {
        id: number;
        nome: string;
        ativa: boolean;
        membros: {
            cim: string;
            nome: string;
            presidente: boolean;
        }[];
    }
}


export default function CardGrupoPessoas(props: CardGrupoPessoasProps) {
    const group = props.group;
    const [userAdmin, setUserAdmin] = useState(false);
    const { get } = useAPI();

    useEffect(() => {
        const checkUserIsPresidente = async () => {
            try {
                const responsePresidente = await get(`${API}/check/user/presidente`);
                const responsePresidenteComissao = await get(`${API}/check/user/presidente/comissao=${group.id}`);

                // Somente atualizar se a resposta for igual a "true"
                if (responsePresidente.data === true || responsePresidenteComissao.data === true) {
                    setUserAdmin(true);
                }
            } catch (error: any) {
                console.error('Error:', error);
            }
        };

        checkUserIsPresidente();
    }, []);


    const [withoutPicture, setWithoutPicture] = useState<string[]>([]);
    const onImageLoadError = (cim: string) => {
        setWithoutPicture((prevWithoutPicture) => [...prevWithoutPicture, cim]);
    };

    const imgMembros = (
        <>
            {group.membros.length > 0 && group.membros.slice(0, 3).map((membro, index) => (
                <img
                    key={index}
                    id={`imgID${index}`}
                    src={`${API}/user/${membro.cim}/picture/small`}
                    alt=""
                    onError={() => onImageLoadError(membro.cim)}
                    className={withoutPicture.includes(membro.cim) ? 'defaultPicture' : ''}
                />
            ))}
        </>
    );

    const modalContent = (
        <ModalComissao comissao={group} />
    );

    const modalFooterContent = (
        <div>
            {userAdmin && (
                <Link href={'/edit/comissao/' + group.id}>
                    <button className="btnPrimary">
                        <p>{group.membros.length > 0 ? 'Gerenciar' : 'Adicionar membros'} </p>
                    </button>
                </Link>
            )}
        </div>
    );


    return (
        <OpenModal
            tagType="button"
            className={`cardGrupoPessoas ${group.ativa ? '' : 'inativa'}`}
            modalTitle={`Comissão ${group.ativa ? '' : '(inativa)'}`}
            modalContent={modalContent}
            modalFooterContent={modalFooterContent}
        >
            <h1 id="nomeComissao">{capitalize(group.nome)}</h1>

            {group.membros.length > 0 ?
                <div id="membros">
                    {imgMembros}
                    <div id="imgVazio" />
                    <p>
                        {capitalize(group.membros[0].nome).split(' ')[0]}
                        &nbsp;e +{group.membros.length}...
                    </p>
                </div>
                :
                <div id="membros">
                    <div id="imgVazio" className="defaultImg" />
                    <p>Nenhum membro</p>
                </div>
            }
        </OpenModal>
    );

}
