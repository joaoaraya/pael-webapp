'use-strict';

import Link from 'next/link';
import './style.scss';

export default function ModalNovaAcao() {
    const acoes = [
        { title: 'Emenda Constitucional', path: '/proposta/emenda-constitucional' },
        { title: 'Projeto de Lei', path: '/proposta/projeto-de-lei' },
        { title: 'Projeto de Resolução', path: '/proposta/projeto-de-resolucao' },
        { title: 'Moção', path: '/proposta/mocao' },
        { title: 'Indicação', path: '/proposta/indicacao' },
        { title: 'Requerimento', path: '/proposta/requerimento' },
        { title: 'Representação', path: '/proposta/representacao' },
        { title: 'Substitutivo', path: '/proposta/substitutivo' },
        { title: 'Decreto Legislativo', path: '/proposta/decreto-legislativo' },
        { title: 'Homologação', path: '/proposta/homologacao' },
        { title: 'Pedido de Licença', path: '/pedido/licenca' },
        { title: 'Pedido de Renúncia', path: '/pedido/renuncia' }
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