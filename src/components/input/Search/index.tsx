'use client';

import { useState } from 'react';
import Icon from '@/components/icon/Icon';
import './style.scss';

type SearchProps = {
    placeholderText?: string;
    getInputText: (value: string) => void; // Função de retorno
}

export default function Search({ placeholderText = 'Search', getInputText }: SearchProps) {
    const [searchValue, setSearchValue] = useState('');

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSearchValue(value);
        getInputText(value); // Enviar texto de volta para a página
    };

    return (
        <div className="searchInput">
            <Icon nome="search" />

            <input
                className="searchBar"
                type="search"
                placeholder={placeholderText}
                value={searchValue}
                onChange={onInputChange}
            />
        </div>
    );
}
