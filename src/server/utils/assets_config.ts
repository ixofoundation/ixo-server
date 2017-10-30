import * as express from 'express';
import {jsWithVersion, cssWithVersion} from '../../utils/version';
import {isProduction} from './environment';

/** Configure application assets using correct version */
export function configureAssets(app: any): void {
    if (isProduction()) {
        app.use('/css', express.static('./dist/css', {maxAge: '30d'}));
        app.use('/js', express.static('./dist/js', {maxAge: '30d'}));
        app.use('/images', express.static('./dist/images', {maxAge: '30d'}));
        app.use('/pdf', express.static('./public/pdf', {maxAge: '30d'}));
        app.use('/fonts', express.static('./public/fonts', {maxAge: '30d'}));
    } else {
        app.use('/css', express.static('./build'));
        app.use('/js', express.static('./build'));
        app.use('/images', express.static('./public/images'));
        app.use('/pdf', express.static('./public/pdf'));
        app.use('/fonts', express.static('./public/fonts'));
    }

    // Serving favicon
    app.use('/favicon.ico', express.static('./public/images/favicon.ico'));

    // Adding helper methods to be used within .ejs files
    app.locals.jsWithVersion = jsWithVersion;
    app.locals.cssWithVersion = cssWithVersion;
}
