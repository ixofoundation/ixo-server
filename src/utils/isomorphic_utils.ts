import {getHostNameFromEnvVars} from "../server/utils/host_name";

/** Returns true if the code is run on the browser */
export function isBrowser() : boolean {
    return typeof window !== 'undefined';
}

/** Returns true if the code is run on the server */
export function isServer() : boolean {
    return !isBrowser();
}

/** Returns the current host name */
export function getHostName() : string {
    if (isBrowser()) {
        return window['HOST_NAME'];
    } else {
        return getHostNameFromEnvVars();
    }
}
