import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {IPublicSiteStoreState} from "../redux/public_site/public_site_reducer";
import {initVersions} from "../utils/version";
import {Provider} from 'react-redux';
import {browserHistory, Router} from 'react-router';
import {createPublicSiteStore} from "../redux/public_site/store";
import {publicSiteRoutes} from "../routes/public_site_routes";

/**
 * This method of initialization allows to pass variables from
 * the server to the client in order to properly initialize
 * external libraries which require special configuration
 */
window['TGE_SERVER_APP'] = window['TGE_SERVER_APP'] || (() => {
    const store : any = ((initialState? : any) => {
        const state = {};
        return {
            set(key, value) {
                state[key] = value
            },
            get(key) {
                return state[key]
            }
        }
    })();

    return {

        /** Perform all actions needed to initialize the app */
        initialize: (preloadedState: IPublicSiteStoreState, revManifest) => {
            window['TGE_SERVER_APP'].initializeVersions(revManifest);
            window['TGE_SERVER_APP'].renderApp(preloadedState);
        },

        /** Initialize versions */
        initializeVersions: initVersions,

        /* Handle every route update */
        handleRouteUpdate() {

        },

        /** Render the application in DOM */
        renderApp: (preloadedState: IPublicSiteStoreState) => {
            ReactDOM.render(
                <Provider store={createPublicSiteStore(preloadedState)}>
                    <Router history={browserHistory} onUpdate={window['TGE_SERVER_APP'].handleRouteUpdate}>
                        { publicSiteRoutes }
                    </Router>
                </Provider>,
                document.getElementById('root')
            );
        }
    };
})();
