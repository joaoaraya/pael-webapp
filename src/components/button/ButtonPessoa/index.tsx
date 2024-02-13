import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';
import defaultPicture from '@/assets/images/defaultProfilePictureDark.png';

import OpenModal from '../OpenModal';
import ModalDeputado from '@/components/modal/ModalDeputado';

import './style.scss';


type ButtonPessoaProps = {
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


export default function ButtonPessoa(props: ButtonPessoaProps) {
    const user = props.user;

    let fotoURL = defaultPicture.src;
    let userNome = "";

    let modalContent = null;

    // Quando carregar os dados da API
    if (user) {
        fotoURL = `${API}/user/${user.cim}/picture/small`;
        userNome = user.nome;
        modalContent = (<ModalDeputado user={user} />);
    }


    return (
        <OpenModal
            tagType="button"
            className="buttonPessoa"
            modalTitle="Deputado"
            modalContent={modalContent}
        >
            <img className="profilePicture" src={fotoURL} alt="" />
            <p>{capitalize(userNome)}</p>
        </OpenModal>
    )
}
