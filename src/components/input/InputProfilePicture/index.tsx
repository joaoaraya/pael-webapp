import { useState, useEffect } from 'react';
import Icon from '@/components/icon/Icon';
import defaultPicture from '@/assets/images/defaultProfilePictureDark.png'
import './style.scss';


type Props = {
    imageFromAPI?: string | null;
    onImageSelected: (file: File) => void;
}


export default function InputProfilePicture({ imageFromAPI = null, onImageSelected }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(imageFromAPI);

    const onInputFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = event.target;
        const file = fileInput.files?.[0];

        if (file) {
            const allowedExtensions = ["png", "jpg", "jpeg", "gif"];
            const fileExtension = file.name.split(".").pop()?.toLowerCase();
            const maxSize = 5 * 1024 * 1024; // 5mb

            if (fileExtension && allowedExtensions.includes(fileExtension) && file.size <= maxSize) {
                const imageURL = URL.createObjectURL(file);
                setSelectedImage(imageURL);

                // Quando haver uma imagem selecionada chamar função de callback na raiz do componente
                onImageSelected(file);
            }
            else {
                fileInput.value = '';

                if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
                    window.alert("Apenas fotos no formato PNG, JPG ou GIF!");
                }
                else {
                    window.alert("Selecione uma foto com até 5mb!");
                }
            }
        }
    }

    useEffect(() => {
        // Atualize a imagem quando `imageFromAPI` mudar
        setSelectedImage(imageFromAPI);
    }, [imageFromAPI]);


    return (
        <div className="inputProfilePicture">
            <div className={`input-container ${selectedImage ? 'selected' : ''}`}>
                <div
                    className="input-bg"
                    style={{ backgroundImage: selectedImage ? `url(${selectedImage})` : 'none' }}
                >
                    <input
                        type="file"
                        id="profilePicture"
                        className="input-btn"
                        onChange={onInputFile}
                        accept=".png, .jpg, .jpeg, .gif"
                    />
                    <label
                        className="input-icon"
                        htmlFor="profilePicture"
                    >
                        <Icon nome="camera" />
                    </label>
                </div>
            </div>

            <p id="desc">Foto de perfil</p>
        </div>
    );
}
