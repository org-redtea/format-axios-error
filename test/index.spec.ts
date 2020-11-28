import {expect} from 'chai';
import {LEVEL, MESSAGE} from '../src/symbols';
import {axiosFormat} from '../src/logform';
import {format} from '../src';
import {axiosError404} from './fixtures/axios-error-404';
import {axiosErrorConnectionRefused} from './fixtures/axios-error-connection-refused';


function expectFormat(
    message: string,
    method: string,
    url: string,
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
        if (checkInstance) {
            expect(formatObj).instanceOf(Error);
        }
        expect(formatObj.message).to.eq(message);
        expect(formatObj.name).to.eq('Error');
        expect(formatObj.isAxiosError).to.eq(true);
        expect(formatObj.stack).to.eq('0');
        expect(formatObj.config).to.deep.eq({
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
        });

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
            'ECONNREFUSED'
        )(actual);
    });

    it('should throw if is not axios error', () => {
        const error = new Error();

        expect(() => format(error as any)).to.throw(TypeError, 'Invalid axios error');
    });
});

describe('logform', () => {
    const logformFormat = axiosFormat();

    it('should format error with response', () => {

        const actual = logformFormat.transform(axiosError404 as any);

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
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

    it('should format error without response', () => {
        const actual = logformFormat.transform(axiosErrorConnectionRefused as any);

        expectFormat(
            'connect ECONNREFUSED 0.0.0.0:80',
            'GET',
            '/path',
            undefined,
            'ECONNREFUSED',
            false
        )(actual);
        expectTransformableInfo(
            'error',
        )(actual);
    });

    it('should format error with response if provided in message property', () => {
        const actual = logformFormat.transform({
            level: 'error',
            message: axiosError404
        });

        expectFormat(
            'Request failed with status code 404',
            'GET',
            '/path',
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

    it('should format error without response if provided in message property', () => {
        const actual = logformFormat.transform({
            level: 'error',
            message: axiosErrorConnectionRefused
        });

        expectFormat(
            'connect ECONNREFUSED 0.0.0.0:80',
            'GET',
            '/path',
            undefined,
            'ECONNREFUSED',
            false
        )(actual);
        expectTransformableInfo(
            'error',
        )(actual);
    });

    it('should pass not axios error', () => {
        const error = new Error();
        const actual = logformFormat.transform(error as any);

        expect(actual).to.eq(error);
    });
});
