import {expect} from 'chai';
import {LEVEL, MESSAGE} from '../src/symbols';
import {axiosError} from '../src/logform';
import {format} from '../src';
import {axiosError404} from './fixtures/axios-error-404';
import {axiosErrorConnectionRefused} from './fixtures/axios-error-connection-refused';
import {axiosErrorRequestReadable} from './fixtures/axios-error-request-readable';
import {axiosErrorResponseReadable} from './fixtures/axios-error-response-readable';


function expectFormat(
    message: string,
    method: string,
    url: string,
    config?: {
        data?: any
    },
    response?: {
        status: number,
        statusText: string
        data?: any,
        headers: Record<string, string>
    },
    code?: string,
    checkInstance: boolean = true,
) {
    return (formatObj: any) => {
        const expectedConfig = Object.assign({}, {
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
        }, config);
        if (checkInstance) {
            expect(formatObj).instanceOf(Error);
        }
        expect(formatObj.message).to.eq(message);
        expect(formatObj.name).to.eq('Error');
        expect(formatObj.isAxiosError).to.eq(true);
        expect(formatObj.stack).to.eq('0');
        expect(formatObj.config).to.deep.eq(expectedConfig);

        if (response) {
            expect(formatObj.response).to.deep.eq(response);
        }

        if (code) {
            expect(formatObj.code).to.deep.eq(code);
        }
    };
}

function expectTransformableInfo(
    level: string
) {
    return (formatObj: any) => {
        expect(formatObj.hasOwnProperty(LEVEL), 'has symbol level').to.be.true;
        expect(formatObj[LEVEL], 'symbol level value').eq(level);
        expect(formatObj.hasOwnProperty(MESSAGE), 'has symbol message').to.be.true;
    };
}

describe('format', () => {

    it('should format error with response', () => {
        const actual = format(axiosError404);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
            undefined,
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
        const actual = format(axiosErrorConnectionRefused);

        expectFormat(
            'connect ECONNREFUSED 0.0.0.0:80',
            'GET',
            '/path',
            undefined,
            undefined,
            'ECONNREFUSED'
        )(actual);
    });

    it('should return original error if it is not an axios error', () => {
        const error = new Error();

        expect(format(error)).to.eq(error);
    });

    it('should format readable in config', () => {
        const actual = format(axiosErrorRequestReadable);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
            {
                data: '[Readable]'
            },
            {
                data: 0,
                status: 404,
                statusText: 'Not Found',
                headers: {}
            },
            undefined
        )(actual);
    });

    it('should format readable in response', () => {
        const actual = format(axiosErrorResponseReadable);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
            undefined,
            {
                data: '[Readable]',
                status: 404,
                statusText: 'Not Found',
                headers: {}
            },
            undefined
        )(actual);
    });
});

describe('logform', () => {
    const logformFormat = axiosError();

    it('should format', () => {
        const actual = logformFormat.transform(axiosError404 as any);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
            undefined,
            {
                data: 0,
                status: 404,
                statusText: 'Not Found',
                headers: {}
            },
            undefined,
            false
        )(actual);
        expectTransformableInfo(
            'error',
        )(actual);
    });
});
