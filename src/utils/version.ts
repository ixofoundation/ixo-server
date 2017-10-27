import * as crypto from 'crypto';
import {isProduction} from "../server/utils/environment";

let revManifest;

/**
 * Initializes the module by storing in memory the manifest so calls to xxWithVersion() methods below will be working
 * correctly
 * @param manifest
 * @param componentCSS
 */
export function initVersions(manifest, componentCSS?: string) {
    revManifest = manifest;
    if (componentCSS) {
        if (isProduction()) {
            revManifest.css['components.css'] = 'components-' + getVersion(componentCSS) + '.css'
        } else {
            revManifest.css['components.css'] = 'components.css';
        }
    }
}

/**
 * Returns the filename given by the path with the version included in the file name
 * @param path  Path of the file inside the js folder
 * @example public_site.js -> public_site-1bsdf123.js
 */
export function jsWithVersion(path: string) : string {
    return revManifest.js[path] || path;
}

/**
 * Returns the filename given by the path with the version included in the file name
 * @param path  Path of the file inside the css folder
 * @example styles.css -> styles-1bsdf123.js
 */
export function cssWithVersion(path: string) : string {
    return revManifest.css[path] || path;
}

/**
 * Returns the filename given by the path with the version included in the file name
 * @param path  Path of the file inside the images folder
 * @example accessories/charger.png -> accessories/charger-12321323.png
 */
export function imageWithVersion(path: string) : string {
    return revManifest.img[path] || path;
}

/**
 * Calculates the version of the given string to be added to the filename
 *
 * Note: This method is meant to be used for component.css (not used for normal files - that's done by gulp)
 *
 * @param text  The given text to calculate the hash for
 */
export function getVersion(text: string) : string {
    return crypto.createHash('md5').update(text).digest('hex').slice(0, 10);
}
