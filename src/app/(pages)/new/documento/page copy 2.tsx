// Importe os módulos necessários
'use client';
import axios from 'axios';
import { FormEvent, useRef } from 'react';
import { API } from '@/functions/urls';
import { useAPI } from '@/hooks/Api';

const UploadDoc = () => {
    const { post } = useAPI();
    const docNameRef = useRef<HTMLInputElement>(null);
    const docFileRef = useRef<HTMLInputElement>(null);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        if (!docFileRef.current?.files?.length) {
            console.error('Selecione um arquivo');
            return;
        }

        const formData = new FormData();
        formData.append('doc_file', docFileRef.current.files[0]!);
        formData.append('doc_name', docNameRef.current!.value);

        try {
            const response = await post(`${API}/doc`, 'multipart/form-data', formData);

            console.log(response.data); // Trate a resposta conforme necessário
        } catch (error) {
            console.error('Erro ao enviar o arquivo', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="doc_name">Nome do Documento:</label>
                <input type="text" id="doc_name" name="doc_name" ref={docNameRef} required />
            </div>
            <div>
                <label htmlFor="doc_file">Arquivo do Documento:</label>
                <input type="file" id="doc_file" name="doc_file" accept=".pdf" ref={docFileRef} required />
            </div>
            <div>
                <button type="submit">Enviar</button>
            </div>
        </form>
    );
};

export default UploadDoc;
