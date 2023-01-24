declare module 'logform/format.js' {
    import {format} from 'logform';
    export = format;
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BROWSER?: string;
        }
    }
}
