import {AxiosError} from 'axios';
import {axiosRequestConfig} from './axios-request-config';


export const axiosErrorConnectionRefused: AxiosError = Object.assign(new Error('connect ECONNREFUSED 0.0.0.0:80'), {
    code: 'ECONNREFUSED',
    config: Object.assign({}, axiosRequestConfig),
    isAxiosError: true,
    stack: '0',
    toJSON: () => ({})
});
