import { useEffect, useState } from 'react';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';

import OpenModal from '@/components/button/OpenModal';
import ModalDocOficial from '@/components/modal/ModalDocOficial';
import iconPdf from '@/assets/images/iconPdf.png';

import './style.scss';
import Icon from '@/components/icon/Icon';


type CardDocProps = {
    doc: {
        id: string;
        nome: string;
        nomeArquivo: string;
        cimAutor: string;
    }
}


export default function CardDocOficial(props: CardDocProps) {
    const doc = props.doc;
    const [userAutor, setUserAutor] = useState(false);
    const { get } = useAPI();

    useEffect(() => {
        const checkUserIs = async () => {
            try {
                const responsePresidente = await get(`${API}/check/user/presidente`);
                const responseAutorDoc = await get(`${API}/check/user/autor/cim=${doc.cimAutor}`);

                // Somente atualizar se a resposta for igual a "true"
                if (responsePresidente.data === true || responseAutorDoc.data === true) {
                    setUserAutor(true);
                }
            }
            catch (error: any) {
                console.error('Error:', error);
            }
        };

        checkUserIs();
    }, []);

    const modalContent = (
        <ModalDocOficial doc={doc} />
    );

    const content = (
        <>
            <img id="icon" src={iconPdf.src} alt="" />
            <div id="desc" className={userAutor ? 'admin' : 'user'}>
                <Icon nome='edit' />
                <p>{doc.nome}</p>
            </div>
        </>
    );


    if (userAutor) {
        return (
            <OpenModal
                tagType="button"
                className="cardDoc"
                modalTitle="Ações"
                modalContent={modalContent}
            >
                {content}
            </OpenModal>
        )
    }

    return (
        <a href={`${API}/doc/${doc.nomeArquivo}`} target="_blank">
            <button className="cardDoc">
                {content}
            </button>
        </a>
    )
}