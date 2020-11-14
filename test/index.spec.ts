import {expect} from 'chai';
import { LEVEL, MESSAGE } from '../src/symbols';
import {axiosError} from '../src';
import {axiosError404} from './fixtures/axios-error-404';
import {axiosErrorConnectionRefused} from './fixtures/axios-error-connection-refused';


function expectFormat(
    message: string,
    method: string,
    url: string,
    level?: string,
    expectLevelSymbol: boolean = true,
    response?: {
        status: number,
        statusText: string
        data?: any,
        headers: Record<string, string>
    },
    code?: string
) {
    return (format: any) => {
        expect(format).an('object');

        const expected: any = {
            message,
            level,
            isAxiosError: true,
            stack: '0',
            config: {
                method,
                url,
                headers: {},
                maxContentLength: 0,
                auth: {
                    password: '0',
                    username: '0'
                },
                data: 0,
                baseURL: 'https://domain.com',
                decompress: true,
                maxBodyLength: 0,
                maxRedirects: 0,
                params: {
                    param: '0'
                },
                proxy: false,
                responseType: 'json',
                socketPath: '0',
                timeout: 0,
                timeoutErrorMessage: '0',
                withCredentials: true,
                xsrfCookieName: '0',
                xsrfHeaderName: '0'
            },
        };

        if (response) {
            expected.response = response;
        }

        if (code) {
            expected.code = code;
        }

        expect(format, 'shape').deep.eq(expected);

        if (expectLevelSymbol) {
            expect(format.hasOwnProperty(LEVEL), 'has symbol level').to.be.true;
            expect(format[LEVEL], 'symbol level value').eq(level);
        }

        expect(format.hasOwnProperty(MESSAGE), 'has symbol message').to.be.true;
        expect(format[MESSAGE], 'symbol message value').eq(message);
    };
}

describe('format output', () => {
    const format = axiosError();

    it('should format error with response', () => {

        const actual = format.transform(axiosError404 as any);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
            'error',
            true,
            {
                data: 0,
                status: 404,
                statusText: 'Not Found',
                headers: {}
            },
            undefined
        )(actual);
    });

    it('should format error without response', () => {
        const actual = format.transform(axiosErrorConnectionRefused as any);

        expectFormat(
            'connect ECONNREFUSED 0.0.0.0:80',
            'GET',
            '/path',
            'error',
            true,
            undefined,
            'ECONNREFUSED'
        )(actual);
    });

    it('should format error with response if provided in message property', () => {
        const actual = format.transform({ level: 'error', message: axiosError404 } as any);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
            'error',
            false,
            {
                data: 0,
                status: 404,
                statusText: 'Not Found',
                headers: {}
            },
            undefined
        )(actual);
    });

    it('should format error without response if provided in message property', () => {
        const actual = format.transform({ level: 'error', message: axiosErrorConnectionRefused } as any);

        expectFormat(
            'connect ECONNREFUSED 0.0.0.0:80',
            'GET',
            '/path',
            'error',
            false,
            undefined,
            'ECONNREFUSED'
        )(actual);
    });

    it('should pass not axios error', () => {
        const error = new Error();
        const actual = format.transform(error as any);

        expect(actual).to.eq(error);
    });
});
