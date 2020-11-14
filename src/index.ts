import format from 'logform/format.js';
import { LEVEL, MESSAGE } from './symbols';
import {
    AxiosError,
} from 'axios';

export const axiosError = format((error) => {
    const storedInMessage = isAxiosError(error.message);
    const axiosError: AxiosError | undefined = storedInMessage
        ? error.message as unknown as AxiosError
        : isAxiosError(error)
            ? error
            : undefined;

    if (!axiosError) {
        return error;
    }

    const info = gatherInfoFromAxiosError(axiosError);

    if (storedInMessage) {
        Object.assign(error, info, {
            message: axiosError.message,
            [MESSAGE]: axiosError.message
        });

        return error;
    }

    const level = (error as any)[LEVEL] || error.level || 'error';

    Object.assign(info, {
        level,
        message: error.message,
        [LEVEL]: level,
        [MESSAGE]: (error as any)[MESSAGE] || error.message
    });

    return info;
});

function gatherInfoFromAxiosError(error: AxiosError): any {
    const info: any = Object.assign({}, error);

    info.stack = error.stack;

    delete info.request;
    delete info.response;
    delete info.toJSON;

    info.config = {
        url: error.config.url,
        method: error.config.method,
        baseURL: error.config.baseURL,
        headers: error.config.headers,
        params: error.config.params,
        data: error.config.data,
        timeout: error.config.timeout,
        timeoutErrorMessage: error.config.timeoutErrorMessage,
        withCredentials: error.config.withCredentials,
        auth: error.config.auth,
        responseType: error.config.responseType,
        xsrfCookieName: error.config.xsrfCookieName,
        xsrfHeaderName: error.config.xsrfHeaderName,
        maxContentLength: error.config.maxContentLength,
        maxBodyLength: error.config.maxBodyLength,
        maxRedirects: error.config.maxRedirects,
        socketPath: error.config.socketPath,
        proxy: error.config.proxy,
        decompress: error.config.decompress,
    };

    const configKeys = Object.keys(info.config);

    for (const key of configKeys) {
        if (info.config[key] === undefined) {
            delete info.config[key];
        }
    }

    if (error.response) {
        info.response = {
            status: error.response.status,
            data: error.response.data,
            headers: error.response.headers,
            statusText: error.response.statusText,
        };
    }

    return info;
}

function isAxiosError(error: any): error is AxiosError {
    return !!error?.isAxiosError;
}
