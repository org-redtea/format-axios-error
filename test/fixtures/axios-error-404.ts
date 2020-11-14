import {AxiosError} from 'axios';
import {axiosRequestConfig} from './axios-request-config';


export const axiosError404: AxiosError = Object.assign(new Error('Request failed with status code 404'), {
    config: Object.assign({}, axiosRequestConfig),
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
