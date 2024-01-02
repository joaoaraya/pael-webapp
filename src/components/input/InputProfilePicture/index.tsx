import { useState, useEffect } from 'react';
import Icon from '../../icon/Icon'

import './style.scss';

interface profilePictureProps {
    imageFromAPI?: string | null;
    onImageSelected: (file: File) => void;
}

export default function InputProfilePicture({ imageFromAPI = null, onImageSelected }: profilePictureProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(imageFromAPI);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];

            if (file) {
                const maxSize = 5 * 1024 * 1024; // 5mb

                if (file.size <= maxSize) {
                    const imageURL = URL.createObjectURL(file);
                    setSelectedImage(imageURL);

                    // Quando haver uma imagem selecionada chamar função de callback na raiz do componente
                    onImageSelected(file);
                }
                else {
                    window.alert('Selecione uma foto com até 5mb');
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
                        onChange={handleChange}
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
