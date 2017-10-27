import * as Immutable from 'immutable';
import {IDictionary} from '../models';

// Concatenate each component CSS into this variable
let componentsCSS = '';

// Media queries width configuration
export const MEDIA_QUERIES_WIDTH_CONFIG = {
    default: 0,   // Default CSS
    xsMin  : 320, // Custom, iPhone Retina
    smMin  : 480, // Extra Small Devices, Phones
    mdMin  : 768, // Small Devices, Tablets
    lgMin  : 992, // Medium Devices, Desktops
    xlgMin : 1200 // Large Devices, Wide Screens
};

// Supported media queries options
interface IMediaQueries {
    default?: string
    xsMin?  : string
    smMin?  : string
    mdMin?  : string
    lgMin?  : string
    xlgMin? : string
}

// Add component CSS to 'componentsCSS' variable. CSS can be a string
// (in which case it will be applied at any screen size), or an object
// literal with specific rules for each supported mobile first media query
export function addComponentCSS(options: string|IMediaQueries): void {
    if(typeof(options) === 'string') {
        componentsCSS += options;
    } else {
        const keys = Object.keys(options);
        keys.forEach((key: string) => {
            componentsCSS += `@media only screen and (min-width : ${MEDIA_QUERIES_WIDTH_CONFIG[key]}px) { ${options[key]} }`;
        });
    }
}

// Return all the CSS that has been concatenated to 'componentsCSS' variable
export function getAllComponentsCSS(): string {
    return componentsCSS;
}

export function addPageCSSToHead() {
    let styleElem = document.createElement('style');
    styleElem.innerHTML = componentsCSS;
    document.getElementsByTagName('head')[0].appendChild(styleElem);
}

export function resetComponentCSS() {
    componentsCSS = '';
}

/**
 * Merge each style map passed to it into a single one.
 * This is useful for concatenating in-line styles in email components
 */
export function mergeStyleMaps(...maps): IDictionary<string> {
    let styles = Immutable.fromJS({});
    maps.forEach((m) => {
        styles = styles.merge(m);
    });
    return styles.toJS();
}
