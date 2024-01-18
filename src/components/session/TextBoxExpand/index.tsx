// TextBoxExpand.tsx

import React, { useState } from 'react';
import './style.scss';

type MainHeaderProps = {
    text?: string;
};

export default function TextBoxExpand(props: MainHeaderProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const expand = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className="textBoxExpand">
            <div className={`textBox ${isExpanded ? 'expanded' : 'minimized'}`}>
                <p>{props.text}</p>
            </div>

            <div className={`fade ${isExpanded ? 'expanded' : 'minimized'}`} />

            <div className="expandArea">
                <div className="expandButton">
                    <button onClick={expand} className="btnSecondary">
                        <p>{isExpanded ? 'Mostrar menos' : 'Mostrar tudo'}</p>
                    </button>
                </div>
            </div>
        </div>
    );
}
