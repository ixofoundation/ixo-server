import {isProduction} from './environment';

/** Return host name according to current environment */
export function getHostNameFromEnvVars(forceProduction?: boolean): string {
    if(isProduction() || forceProduction) {
        return process.env.HOST_NAME_PROD;
    } else {
        return process.env.HOST_NAME_DEV;
    }
}
