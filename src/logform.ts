import logformFormat from "logform/format.js";
import {AxiosError} from 'axios';
import {LEVEL, MESSAGE} from './symbols';
import {AxiosErrorFormatError} from './axios-error-format';
import {format, isAxiosError} from './core';


export interface TransformableInfo<T = any> extends AxiosErrorFormatError<T> {
    level: string;
}

export const axiosFormat = logformFormat((error) => {
    const storedInMessage = isAxiosError(error.message);
    const axiosError: AxiosError | undefined = storedInMessage
        ? error.message as unknown as AxiosError
        : isAxiosError(error)
            ? error
            : undefined;

    if (!axiosError) {
        return error;
    }

    const info = format(axiosError);

    if (storedInMessage) {
        Object.assign(error, info, {
            message: info.message,
            stack: info.stack,
            [LEVEL]: (error as any)[LEVEL] || error.level || 'error',
            [MESSAGE]: (error as any)[MESSAGE] || info.message,
        });

        return error;
    }

    Object.assign(info, {
        level: error.level || 'error',
        [LEVEL]: (error as any)[LEVEL] || error.level || 'error',
        [MESSAGE]: (error as any)[MESSAGE] || info.message
    });

    return info as TransformableInfo;
});
