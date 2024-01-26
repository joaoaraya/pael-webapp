import Icon from '@/components/icon/Icon';
import './style.scss';


type ErrorPageProps = {
    icon: string;
    title: string;
    text?: string;
}


export default function ErrorPage(props: ErrorPageProps) {
    return (
        <div className="errorPage">
            <Icon nome={props.icon} />

            <h1>{props.title}</h1>

            {props.text && (
                <p>{props.text}</p>
            )}
        </div>
    );
}