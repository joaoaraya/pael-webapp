import './style.css'

type LoaderProps = {
    size?: string;
    color?: string;
}

export default function IconLoader(props: LoaderProps) {
    return (
        <span className="loader" style={{ width: props.size, height: props.size }} />
    )
}