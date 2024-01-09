import React from 'react';
import CardPostAcao from '@/components/card/CardPostAcao';

import './style.scss';

type ListPostsAcaoProps = {
    posts: {
        id: string;
        ativo: boolean;
        tipo: string;
        titulo: string;
        statusAtual: string;
        statusFinal: string;
        dataDeAtualizacao: string;
        autor: {
            cim: string;
            nome: string
        }
    }[];
}

export default function ListPostsAcao(props: ListPostsAcaoProps) {
    return (
        <div className="listPostsAcao">
            {props.posts.map((post, index) =>
                <CardPostAcao key={index} post={post} />
            )}
        </div>
    )
}