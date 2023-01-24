import {AxiosError,} from 'axios';
import {AxiosErrorFormatError, CONFIG_KEYS, RESPONSE_KEYS} from './axios-error-format';


export function format<E = any>(error: E): E extends AxiosError<infer T> ? AxiosErrorFormatError<T> : E {
    if (!isAxiosError(error)) {
        return error as any;
    }

    const formatError: Partial<AxiosErrorFormatError> = new Error(error.message);

    formatError.name = error.name;
    formatError.stack = error.stack;
    formatError.code = error.code;
    formatError.isAxiosError = error.isAxiosError;
    formatError.config = {};

    for (const configKey of CONFIG_KEYS) {
        if (error.config[configKey] !== undefined) {
            formatError.config[configKey] = configKey === 'data'
                ? formatData(error.config[configKey])
                : error.config[configKey];
        }
    }

    if (error.response) {
        formatError.response = {} as any;
        for (const responseKey of RESPONSE_KEYS) {
            if (error.response[responseKey] !== undefined) {
                (formatError.response as any)[responseKey] = responseKey === 'data'
                  ? formatData(error.response[responseKey])
                  : error.response[responseKey];
            }
        }
    }

    return formatError as any;
}

function formatData(data: any): any {
    if (process.env.BROWSER !== 'true') {
        if (data instanceof require('stream').Readable) {
            return '[Readable]';
        }
    }

    return data;
}

export function isAxiosError(error: any): error is AxiosError {
    return !!error?.isAxiosError;
}
