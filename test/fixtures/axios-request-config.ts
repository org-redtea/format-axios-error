import axios, {AxiosAdapter, AxiosRequestConfig, CancelToken} from 'axios';

export const axiosRequestConfig: AxiosRequestConfig = {
    method: 'GET',
    url: '/path',
    headers: {},
    maxContentLength: 0,
    auth: {
        password: '0',
        username: '0'
    },
    data: 0,
    baseURL: 'https://domain.com',
    adapter: (() => {
    }) as unknown as AxiosAdapter,
    onUploadProgress: () => {
    },
    cancelToken: {} as CancelToken,
    decompress: true,
    httpAgent: {},
    httpsAgent: {},
    maxBodyLength: 0,
    maxRedirects: 0,
    onDownloadProgress: () => {
    },
    params: {
        param: '0'
    },
    paramsSerializer: () => '0',
    proxy: false,
    responseType: 'json',
    socketPath: '0',
    timeout: 0,
    timeoutErrorMessage: '0',
    transformRequest: [],
    transformResponse: [],
    validateStatus: () => false,
    withCredentials: true,
    xsrfCookieName: '0',
    xsrfHeaderName: '0'
};
