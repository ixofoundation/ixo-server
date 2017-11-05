import * as fs from 'fs';
import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {Router, RouterContext, match} from 'react-router';
import {publicSiteRoutes} from './routes/public_site_routes';
import {createPublicSiteStore} from "./redux/public_site/store";
import {Provider} from 'react-redux';

import {getAllComponentsCSS, resetComponentCSS} from './utils/css_styler';
import {initVersions} from './utils/version';
import * as CleanCSS from 'clean-css';
import * as autoprefixer from 'autoprefixer';
import * as postcss from 'postcss';
import {getManifest} from "./server/utils/rev_manifest";
import {configureAssets} from "./server/utils/assets_config";
import {getHostName} from "./utils/isomorphic_utils";
import {getPageTitle} from "./utils/page_title";
import {getMetaTags} from "./utils/meta_tags";
import {isLocalHostProduction, isProduction, isProductionServer} from "./server/utils/environment";
import {connectToDb} from "./server/db/config";

const revManifest = getManifest();

// Levels of optimization:
// 1 -> safer optimization (shouldn't cause issues)
// 2 -> very aggressive optimization that can cause issues.
const componentsCss = new CleanCSS({
    level: 2
}).minify(getAllComponentsCSS()).styles;
initVersions(revManifest, componentsCss);

// We got all public site css, but we need admin panel styles too. After saving public site style we reset global css
// variable and getting new admin panel styles by requiring admin_panel_routes. After this getAllComponentsCSS() will
// return only those styles that was added after reset
// Note: Components that are used both by admin panel and public site, are included only inside the public site css so
// we need to be including the public site css inside admin panel as well.
resetComponentCSS();

if(!isProduction() || isLocalHostProduction()) { require('dotenv').config(); }

const stylesCssPath = isProduction() ? "dist/css/styles.css" : "build/styles.css";
const stylesCss = fs.readFileSync(stylesCssPath, "utf8");

const fontAwesomeCustomCssPath = isProduction() ? "dist/css/font-awesome-custom/css/font-awesome-custom.css" : "build/font-awesome-custom/css/font-awesome-custom.css";

const bootstrapCustomCssPath = isProduction() ? "dist/css/bootstrap/css/bootstrap.min.css" : "build/bootstrap/css/bootstrap.min.css";
const primerCustomCssPath = isProduction() ? "dist/css/primer/css/primer.min.css" : "build/primer/css/primer.min.css";

const fontAwesomeCustomCss = fs.readFileSync(fontAwesomeCustomCssPath, "utf8");
const bootstrap = fs.readFileSync(bootstrapCustomCssPath);
const primer = fs.readFileSync(primerCustomCssPath);


const port = (parseInt(process.env.PORT, 10) || 3000) - (!isProduction() as any);
const app = express();

// Support json encoded bodies
app.use(bodyParser.json());
// Support cookies
app.use(cookieParser());
if(isProduction()){
    app.set('views', './dist/ejs');
} else {
    app.set('views', './src/server/views');
}
app.set('view engine', 'ejs');

// Configure application assets
configureAssets(app);

// Require application custom route handlers
require('./server/public_site_routes')(app);

const configuredAutoprefixer = postcss([autoprefixer({
    browsers: ['> 5%', 'last 2 versions']
})]);


// Route handler that rules them all!
app.get('*', (req: any, res: any) => {
    // Creating the public site store using initialized data
    const store = createPublicSiteStore(req.publicStoreState);
    // Do a router match
    match({
            routes: (
                <Provider store={store}>
                    <Router>{publicSiteRoutes}</Router>
                </Provider>
            ),
            location: req.url,
        },
        (err:any, redirect:any, props:any) => {
            // Some sanity checks
            if (err) {
                return res.status(500).send(err.message);
            } else if (redirect) {
                return res.redirect(302, redirect.pathname + redirect.search);
            } else if (!props) {
                return res.status(404).send('not found');
            }
            Promise.all([
                configuredAutoprefixer.process(stylesCss),
                configuredAutoprefixer.process(componentsCss)
            ])
                .then(([prefixedStylesCss, prefixedComponentsCss]) => {
                    // Respond with EJS template
                    res.render('index', {
                        bootstrap,
                        primer,
                        revManifest,
                        componentsCss: prefixedComponentsCss.css,
                        stylesCss: prefixedStylesCss.css,
                        fontAwesomeCustomCss,
                        pageTitle                : req.pageTitle || getPageTitle(req.url),
                        metaTags                 : req.metaTags || getMetaTags(req.url),
                        storeState               : store.getState(),
                        hostName                 : getHostName(),
                        isProductionServer       : isProductionServer(),
                        renderedRoot             : ReactDOMServer.renderToString(
                            <Provider store={store}>
                                <RouterContext {...props} />
                            </Provider>
                        )
                    });
                })

        });
});

const server = http.createServer(app);

// Open a new connection when Node.js app starts, reuse the existing
// db connection object.  See more: http://bit.ly/2aw94I9
connectToDb()
    .then((db) => {
        console.log('Connected successfully to database server');
        app.locals.db = db; // Make db accessible through out the application
        server.listen(port, (err:any) => {
            if (err) throw err;
            console.info(`[🚀 ] Server started on port ${port}`); // eslint-disable-line
        });
    })
    .catch(err => console.error(err));

module.exports = app;
