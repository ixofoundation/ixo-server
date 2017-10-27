// Utility function to determine if server is running in test mode
import {getHostName} from "../../utils/isomorphic_utils";
export function isTest(): boolean {
    return process.env.NODE_ENV === 'test';
}

// Utility function to determine if server is running in production mode
export function isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
}

export function isProductionServer(): boolean {
    return getHostName().indexOf("www.phonetradr.com") > 0;
}

export function isBetaServer(): boolean {
    return getHostName().indexOf("beta.phonetradr.com") > 0;
}

export function isLocalHostProduction(): boolean {
    return process.env.IS_LOCAL_HOST === 'true' && isProduction();
}