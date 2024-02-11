"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';
import axios from 'axios';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import OpenResponseModal from '@/components/button/OpenResponseModal';
import ResponseModal from '@/components/modal/ResponseModal';
import InputProfilePicture from '@/components/input/InputProfilePicture';
import LoadingPage from '@/components/session/LoadingPage';

import './style.scss';


type PageProps = {
    cim: string;
}


export default function PageEditUserFoto({ params }: { params: PageProps }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit } = useForm();
    const { put } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [profilePicture, setProfilePicture] = useState<string | null>(null as string | null);
    const [formDataImage, setFormDataImage] = useState<FormData | null>(null);

    const userCIM = params.cim;

    /* Server functions */

    useEffect(() => {
        const loadProfilePicture = async () => {
            try {
                const response = await axios.get(`${API}/user/${userCIM}/picture/large`, {
                    responseType: 'blob',
                });

                const image = URL.createObjectURL(new Blob([response.data]));
                return image;
            }
            catch (error) {
                console.error('Imagem de perfil não encontrada:', error);
                return null;
            }
        }

        const loadUserData = async () => {
            try {
                const imageFile = await loadProfilePicture();
                setProfilePicture(imageFile);

                setIsLoading(false);
            }
            catch (error: any) {
                setIsLoading(false);
            }
        }

        loadUserData();
    }, []);


    const sendData = async () => {
        try {
            const response = await put(`${API}/user/${userCIM}/picture`, 'multipart/form-data', formDataImage);

            setShowResponseModal(<ResponseModal icon={response.data.response} message={response.data.message} />);
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    }


    /* Client functions */

    const getProfilePictureFromInput = async (imageFile: File | null) => {
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append('profile_picture', imageFile);

                setFormDataImage(formData);
            }
            catch (error) {
                console.error(error);
            }
        }
    }

    // Validar formularios antes de liberar botão de enviar dados
    const validateForms = () => {
        if (!formDataImage) {
            return ("Nenhuma foto nova selecionada!");
        }
        return null;
    }

    // Qual botão mostrar?
    const submitButton = (buttonText: string) => {
        const validationMessage = validateForms();

        if (validationMessage) {
            return (
                <OpenResponseModal
                    tagType="button"
                    className="btnPrimary"
                    icon="warning"
                    message={validationMessage}
                >
                    <p>{buttonText}</p>
                </OpenResponseModal>
            );
        }

        return (
            <OpenConfirmModal
                tagType="button"
                className="btnPrimary"
                title="Salvar nova foto de perfil?"
                action={handleSubmit(sendData)}
                actionText={buttonText}
            >
                <p>{buttonText}</p>
            </OpenConfirmModal>
        );
    }


    if (isLoading) {
        return (<LoadingPage />)
    }

    return (
        <div className="pageEditUserOption pageEditUserFoto">
            <div className="titulo">
                <h1>Foto de Perfil</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <InputProfilePicture
                    imageFromAPI={profilePicture}
                    onImageSelected={getProfilePictureFromInput}
                />

                <div className="actionButtons">
                    {submitButton("Salvar")}

                    <button className="btnSecondary" onClick={router.back}>
                        <p>Voltar</p>
                    </button>
                </div>
            </form>

            {showResponseModal}
        </div>
    );
}
