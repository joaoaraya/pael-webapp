import PageEditUser from './(options)/layout';
import './style.scss';


type PageProps = {
    cim: string;
}


export default function PageEditUserHome({ params }: { params: PageProps }) {
    return (
        <div className="pageHome">
            <PageEditUser params={params} />
        </div>
    );
}
