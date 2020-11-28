import {AxiosError,} from 'axios';
import {AxiosErrorFormatError, CONFIG_KEYS, RESPONSE_KEYS} from './axios-error-format';


export function format<T = any>(error: AxiosError<T>): AxiosErrorFormatError<T> {
    if (!isAxiosError(error)) {
        throw new TypeError('Invalid axios error')
    }

    const formatError: Partial<AxiosErrorFormatError<T>> = new Error(error.message);

    formatError.name = error.name;
    formatError.stack = error.stack;
    formatError.code = error.code;
    formatError.isAxiosError = error.isAxiosError;
    formatError.config = {};

    for (const configKey of CONFIG_KEYS) {
        if (error.config[configKey] !== undefined) {
            formatError.config[configKey] = error.config[configKey];
        }
    }

    if (error.response) {
        formatError.response = {} as any;
        for (const responseKey of RESPONSE_KEYS) {
            if (error.response[responseKey] !== undefined) {
                (formatError.response as any)[responseKey] = error.response[responseKey];
            }
        }
    }

    return formatError as AxiosErrorFormatError<T>;
}

export function isAxiosError(error: any): error is AxiosError {
    return !!error?.isAxiosError;
}
