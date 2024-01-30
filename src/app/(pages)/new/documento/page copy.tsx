"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useAPI } from '@/hooks/Api';
import { API } from '@/functions/urls';

import OpenConfirmModal from '@/components/button/OpenConfirmModal';
import ResponseModal from '@/components/modal/ResponseModal';

import './style.scss';

export default function PageNewDocumento() {
    const router = useRouter();
    const { handleSubmit } = useForm();
    const { post } = useAPI();
    const [showResponseModal, setShowResponseModal] = useState(<></>);
    const [data, setData] = useState({ file: '', name: '' });

    const sendData = async () => {
        try {
            const formData = new FormData();
            formData.append('doc_file', data.file);
            formData.append('doc_name', data.name);

            const response = await post(`${API}/doc`, 'multipart/form-data', formData);

            setShowResponseModal(
                <ResponseModal
                    icon={response.data.response}
                    message={response.data.message}
                    action={() => { router.push('/dashboard/documentos') }}
                />
            );
        }
        catch (error: any) {
            setShowResponseModal(<ResponseModal icon="error" message={error.toString().slice(7)} />);
        }
    };

    const onSelectedFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            if (file) {
                const maxSize = 10 * 1024 * 1024; // 10mb

                if (file.size <= maxSize) {
                    const doc = URL.createObjectURL(file);
                    setData({ ...data, file: doc });
                }
                else {
                    event.target.value = '';
                    window.alert('Selecione um documento com até 10mb');
                }
            }
        }
    };

    return (
        <div className="pageNewDocumento">
            <div className="titulo">
                <h1>Novo Documento Oficial</h1>
            </div>

            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    className="inputText"
                    placeholder="Descrição curta do documento"
                    onChange={(e) => { setData({ ...data, name: e.target.value }) }}
                    maxLength={100}
                />

                <input
                    type="file"
                    onChange={onSelectedFile}
                    accept=".pdf"
                />

                <OpenConfirmModal
                    tagType="button"
                    className="btnPrimary"
                    title="Publicar documento na lista oficial?"
                    action={handleSubmit(sendData)}
                    actionText="Publicar"
                >
                    <p>Publicar</p>
                </OpenConfirmModal>
            </form>

            {showResponseModal}
        </div>
    );
}
