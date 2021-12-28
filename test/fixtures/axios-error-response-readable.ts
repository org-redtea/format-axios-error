import {AxiosError} from 'axios';
import {Readable} from 'stream';
import {axiosRequestConfig} from './axios-request-config';


export const axiosErrorResponseReadable: AxiosError = Object.assign(new Error('Request failed with status code 404'), {
    config: Object.assign({}, axiosRequestConfig),
    isAxiosError: true,
    response: {
        config: Object.assign({}, axiosRequestConfig),
        status: 404,
        statusText: 'Not Found',
        data: new Readable(),
        headers: {}
    },
    stack: '0',
    toJSON: () => ({})
});
