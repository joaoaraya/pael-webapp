import React, { useState } from 'react';
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
    const maxPosts = 12; // Quantidade máxima de posts

    const [visiblePosts, setVisiblePosts] = useState(maxPosts);
    const { posts } = props;

    const loadMorePosts = () => {
        setVisiblePosts(prev => prev + maxPosts); // Aumenta a quantidade de posts
    };

    return (
        <div className="listPostsAcao">
            <div className="mainPosts">
                {posts.slice(0, visiblePosts).map((post, index) =>
                    <CardPostAcao key={index} post={post} />
                )}
            </div>

            {posts.length > visiblePosts && (
                <div className="footerPosts">
                    <div className="loadMoreButton">
                        <button className="btnSecondary" onClick={loadMorePosts}>
                            <p>Mostrar mais</p>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
