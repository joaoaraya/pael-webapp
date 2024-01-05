import { useState, useEffect } from 'react';
import './style.scss';

type Option = {
    id: string;
    titulo: string;
    selecionado: boolean;
};

type FilterGroup = {
    grupo: string;
    opcoes: Option[];
};

type FilterProps = {
    getOptions: (ordenarPor: string, exibir: string) => void;
};

export default function ModalFiltros(props: FilterProps) {
    const defaultFilters: FilterGroup[] = [
        {
            grupo: 'Ordenar por:',
            opcoes: [
                { id: 'nome', titulo: 'Nome', selecionado: true },
                { id: 'cim', titulo: 'CIM', selecionado: false },
                { id: 'loja', titulo: 'Loja', selecionado: false },
                { id: 'lojaNumero', titulo: 'Nº loja', selecionado: false },
                { id: 'cargo', titulo: 'Cargo', selecionado: false },
                { id: 'situacao', titulo: 'Situação', selecionado: false },
            ],
        },
        {
            grupo: 'Exibir:',
            opcoes: [
                { id: 'todos', titulo: 'Todos', selecionado: true },
                { id: 'ativos', titulo: 'Ativos', selecionado: false },
                { id: 'inativos', titulo: 'Inativos', selecionado: false },
                { id: 'comCargos', titulo: 'Com Cargos', selecionado: false },
                { id: 'semCargos', titulo: 'Sem Cargos', selecionado: false },
            ],
        },
    ];

    const [filtros, setFiltros] = useState<FilterGroup[]>(defaultFilters);

    useEffect(() => {
        // Salvar opões selecionadas na sessão temporaria
        const savedOptions = sessionStorage.getItem('filtros');

        if (savedOptions) {
            setFiltros(JSON.parse(savedOptions));
        }

        // Apagar opções ao recarregar página
        window.addEventListener('beforeunload', () => sessionStorage.removeItem('filtros'));
    }, []);


    const saveAndApplyFilters = (updatedFilters: FilterGroup[]) => {
        sessionStorage.setItem('filtros', JSON.stringify(updatedFilters));

        const ordenarPor = updatedFilters[0].opcoes.find((opcao) => opcao.selecionado)?.id || '';
        const exibir = updatedFilters[1].opcoes.find((opcao) => opcao.selecionado)?.id || '';

        props.getOptions(ordenarPor, exibir);
        setFiltros(updatedFilters);
    };


    const onSelectedOption = (grupoIndex: number, opcaoIndex: number) => {
        const updatedFilters = filtros.map((filtro, index) => {
            if (index === grupoIndex) {
                return {
                    ...filtro,
                    opcoes: filtro.opcoes.map((opcao, index) => ({
                        ...opcao,
                        selecionado: index === opcaoIndex,
                    })),
                };
            }
            return filtro;
        });

        saveAndApplyFilters(updatedFilters);
    };


    return (
        <div className="modalFiltros">
            {filtros.map((filtro, grupoIndex) => (
                <div key={grupoIndex} className="filtrosGrupo">
                    <h1>{filtro.grupo}</h1>
                    {filtro.opcoes.map((opcao, opcaoIndex) => (
                        <button
                            key={opcaoIndex}
                            className={opcao.selecionado ? 'selecionado' : ''}
                            onClick={() => onSelectedOption(grupoIndex, opcaoIndex)}
                        >
                            <p>{opcao.titulo}</p>
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}
