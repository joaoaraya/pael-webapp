'use client';

import { useEffect } from 'react';

export default function Home() {

    useEffect(() => {
        const time = 1;
        const path = "/login";
        const redirectToURL = setTimeout(() => {
            window.location.href = path;
        }, time);

        return () => clearTimeout(redirectToURL);
    }, []);

    return (
        <></>
    )
}