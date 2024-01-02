import './style.scss';

type Props = {
    security: {
        level: number;
        text: string;
    }
};

const securityLevels = [
    { bars: ['full', 'empty', 'empty'] },
    { bars: ['full', 'full', 'empty'] },
    { bars: ['full', 'full', 'full'] },
];

export default function InputPasswordChecker(props: Props) {
    const { level, text } = props.security;
    const { bars } = securityLevels[level];

    return (
        <div className="password-security">
            <div className={`level${level}`}>
                <div className="bars">
                    {bars.map((status, index) => <div key={index} id={status} />)}
                </div>

                <div className="text">
                    <p>{text}</p>
                </div>
            </div>

        </div>
    );
}
