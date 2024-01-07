import CardDocOficial from '@/components/card/CardDocOficial';
import './style.scss';


type ListDocsProps = {
    docs: {
        id: string;
        nome: string;
        nomeArquivo: string;
        cimAutor: string;
    }[];
};


export default function ListDocsOficiais(props: ListDocsProps) {
    return (
        <div className="listDocs">
            {props.docs.map((doc, index) => (
                <CardDocOficial key={index} doc={doc} />
            ))}
        </div>
    );
}
