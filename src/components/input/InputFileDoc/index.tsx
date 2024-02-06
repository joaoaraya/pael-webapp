import React, { useState } from 'react';
import Icon from '@/components/icon/Icon';
import iconPdf from '@/assets/images/iconPdf.png';
import './style.scss';

type Props = {
    onSelectedFile: (file: File) => void;
}

export default function InputFileDoc({ onSelectedFile }: Props) {
    const [fileName, setFileName] = useState<string>("");

    const onInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        const file = fileInput.files?.[0];

        if (file) {
            const allowedExtensions = ["pdf"];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            const maxSize = 10 * 1024 * 1024; // 10mb

            if (fileExtension && allowedExtensions.includes(fileExtension) && file.size <= maxSize) {
                // Enviar arquivo como callback
                onSelectedFile(file);
                setFileName(file.name);
            }
            else {
                fileInput.value = '';
                setFileName('');

                if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                    window.alert("Apenas documentos PDF!");
                }
                else {
                    window.alert("Selecione um documento com até 10mb!");
                }
            }
        }
    }

    return (
        <div className="inputFileDoc">
            <label className="fileButton">
                <div className="title">
                    <Icon nome="doc" />
                    <p>Clique aqui ou arraste o documento para anexar</p>
                </div>

                <input
                    type="file"
                    id="fileInput"
                    className="fileInput"
                    onChange={onInputFile}
                    accept=".pdf"
                />
            </label>

            {fileName && (
                <div className="fileNameCard">
                    <div className="container">
                        <img id="icon" src={iconPdf.src} alt="" />
                        <p id="fileName"><b>Anexo:</b> {fileName}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
