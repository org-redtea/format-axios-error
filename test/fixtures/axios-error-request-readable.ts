import {AxiosError} from 'axios';
import {Readable} from 'stream';
import {axiosRequestConfig} from './axios-request-config';


export const axiosErrorRequestReadable: AxiosError = Object.assign(new Error('Request failed with status code 404'), {
    config: Object.assign({}, axiosRequestConfig, {
        data: new Readable(),
    }),
    isAxiosError: true,
    response: {
        config: Object.assign({}, axiosRequestConfig),
        status: 404,
        statusText: 'Not Found',
        data: 0,
        headers: {}
    },
    stack: '0',
    toJSON: () => ({})
});
