import { useCookies } from 'react-cookie';
import axios, { Method } from 'axios';

type RequestProps = {
    method: Method;
    url: string;
    data?: any;
    contentType?: string;
}

export const useAPI = () => {
    // Procurar o token nos cookies, se não encontrar.. atribuir null
    const [cookies] = useCookies(['token']);
    const token = cookies.token || null;

    const makeRequest = async ({ method, url, contentType, data }: RequestProps) => {
        if (!token) {
            throw new Error('Token ausente');
        }

        try {
            const config = {
                method,
                url,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': contentType || null
                },
                data: data || null,
            }

            const response = await axios(config);
            return response;
        }
        catch (error: any) {
            let message = "Falha no servidor! Tente novamente ou mais tarde";

            if (error.response.data) {
                message = error.response.data.message;
            }
            else {
                window.alert(message);
            }

            throw new Error(message);
        }
    }

    const get = (url: string) => makeRequest({ method: 'GET', url });
    const post = (url: string, contentType?: string, data?: any) => makeRequest({ method: 'POST', url, contentType, data });
    const put = (url: string, contentType?: string, data?: any) => makeRequest({ method: 'PUT', url, contentType, data });
    const del = (url: string, contentType?: string, data?: any) => makeRequest({ method: 'DELETE', url, contentType, data });

    return { get, post, put, del }
}
