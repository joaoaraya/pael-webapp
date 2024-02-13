import { useEffect, useState } from 'react';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import { capitalize } from '@/functions/visual';
import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';
import LoadingCard from '@/components/session/LoadingCard';

import './style.scss';
import Search from '@/components/input/Search';


type ModalProps = {
    comissaoID: number;
    presidente?: boolean;
}

type PessoasProps = {
    nome: string;
    cim: string;
    ativo: boolean;
}[];

export default function ModalAdicionarMembro(props: ModalProps) {
    const [isLoading, setIsLoading] = useState(true);
    const { get, post } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [allUsers, setAllUsers] = useState<PessoasProps>([]); // Todos os usuários recebidos da API (Backup) 
    const [users, setUsers] = useState<PessoasProps>([]); // Lista final de usuarios filtrados


    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await get(`${API}/users`);
                setAllUsers(response.data);

                setIsLoading(false);
            }
            catch (error: any) {
                // Ações de erro no hook de API
            }
        }

        loadUserData();
    }, []);


    const adicionarMembro = async (cim: string) => {
        try {
            const moreParams = props.presidente ? '/cargo=presidente' : '';

            const response = await post(
                `${API}/comissao/${props.comissaoID}${moreParams}`,
                "application/json",
                JSON.stringify({ id_cim: cim })
            );
            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }

    /* Filtrar usuários pela barra de pesquisa */
    const search = (text: string) => {
        const searchText = text.toLowerCase().trim();
        const maxUsers = 8;

        const usersFilter = allUsers.filter((user) => {
            // Quando não encotrar resultado mostrar um objeto vazio
            const { cim, nome, ativo } = user || {};

            // Verificar se cada propriedade não é null
            const userCim = cim ? cim.toString() : '';
            const userNome = nome ? nome.toLowerCase() : '';

            return (
                ativo &&
                (userCim.includes(searchText) ||
                    userNome.includes(searchText))
            );
        }).slice(0, searchText ? maxUsers : 0);

        setUsers(usersFilter);
    };


    if (isLoading) {
        return (<LoadingCard />)
    }

    if (users) {
        return (
            <div className="modalAdicionarMembro">
                <Search placeholderText="Procure por cim ou nome..." getInputText={search} />

                <div className="listUsers">
                    {users.map((user, index) => (
                        <OpenConfirmModal
                            key={index}
                            tagType="button"
                            className="user"
                            title={props.presidente ? "Nomear Deputado Presidente da Comissão?" : "Adicionar membro à comissão?"}
                            action={() => adicionarMembro(user.cim)}
                            actionText={props.presidente ? "Nomear Presidente" : "Adicionar"}
                        >
                            <img
                                className="profilePicture"
                                src={`${API}/user/${user.cim}/picture/small`}
                                alt=""
                            />

                            <p className="nome">{user.cim}: {capitalize(user.nome)}</p>
                        </OpenConfirmModal>
                    ))}
                </div>

                {showResponseModal}
            </div>
        )
    }
}
