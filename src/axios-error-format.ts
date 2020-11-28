import {AxiosRequestConfig, AxiosResponse} from 'axios';


export const CONFIG_KEYS = [
    'url',
    'method',
    'baseURL',
    'headers',
    'params',
    'data',
    'timeout',
    'timeoutErrorMessage',
    'withCredentials',
    'auth',
    'responseType',
    'xsrfCookieName',
    'xsrfHeaderName',
    'maxContentLength',
    'maxBodyLength',
    'maxRedirects',
    'socketPath',
    'proxy',
    'decompress',
] as const;

export const RESPONSE_KEYS = [
    'data',
    'status',
    'statusText',
    'headers',
] as const;

export interface AxiosErrorFormat<T = any> {
    config: Pick<AxiosRequestConfig, typeof CONFIG_KEYS[number]>;
    code?: string;
    response?: Pick<AxiosResponse<T>, typeof RESPONSE_KEYS[number]>;
    isAxiosError: boolean;
}

export interface AxiosErrorFormatError<T = any> extends Error, AxiosErrorFormat<T> {}
