import { AxiosError, AxiosRequestConfig } from 'axios';

export const CONFIG_KEYS = [
    "url",
    "method",
    "baseURL",
    "headers",
    "params",
    "data",
    "timeout",
    "timeoutErrorMessage",
    "withCredentials",
    "auth",
    "responseType",
    "proxy",
    "decompress"
] as const;

export type AxiosErrorFormat = {
    config: Pick<AxiosRequestConfig, typeof CONFIG_KEYS[number]>,
    response,
    code?: string,
    stack?: string,
    message: string
    name: string,
    isAxiosError: true
}
export function formatAxiosError(error: AxiosError): AxiosErrorFormat {
    const config = CONFIG_KEYS.reduce((acc, key) => ({
        ...acc,
        [key]: error.config[key]
    }), {} as Pick<AxiosRequestConfig, typeof CONFIG_KEYS[number]>);

    const response = {
        data: error.response?.data,
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
    }

    return {
        config,
        response,
        code: error.code,
        stack: error.stack,
        name: error.name,
        message: error.message || `Request failed${error.response?.status ? ` with status code ${error.response?.status}` : ''}`,
        isAxiosError: true
    }
}