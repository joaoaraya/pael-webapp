'use-strict';

import Link from 'next/link';
import './style.scss';

export default function ModalNovaAcao() {
    const acoes = [
        { title: 'Emenda Constitucional', path: '/emenda-constitucional' },
        { title: 'Projeto de Lei', path: '/projeto-de-lei' },
        { title: 'Projeto de Resolução', path: '/projeto-de-resolucao' },
        { title: 'Moção', path: '/mocao' },
        { title: 'Indicação', path: '/indicacao' },
        { title: 'Requerimento', path: '/requerimento' },
        { title: 'Representação', path: '/representacao' },
        { title: 'Substitutivo', path: '/substitutivo' },
        { title: 'Decreto Legislativo', path: '/decreto-legislativo' },
        { title: 'Homologação', path: '/homologacao' },
        { title: 'Pedido de Licença', path: '/pedido-de-licenca' },
        { title: 'Pedido de Renúncia', path: '/pedido-de-renuncia' }
    ];

    return (
        <div className="modalNovaAcao">
            {acoes.map((acao: any, index) => (
                <Link href={"/new/acao" + acao.path}>
                    <button key={index} >
                        <p>{acao.title}</p>
                    </button>
                </Link>
            ))}
        </div>
    )
}