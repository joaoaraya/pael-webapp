import IconLoaderDuo from '@/components/icon/IconLoaderDuo';
import './style.scss';

export default function LoadingPage() {
    return (
        <div className="loadingPage">
            <IconLoaderDuo />
            <p>Carregando...</p>
        </div>
    );
}