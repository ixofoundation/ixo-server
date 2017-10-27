import * as React from 'react';
import {Route, RouterState} from 'react-router';
import {AppFromStore} from '../containers/App';
import {HomePageFromStore} from "../containers/HomePage";

declare const __WEBPACK_SERVER__;

if (typeof __WEBPACK_SERVER__ !== "undefined" && __WEBPACK_SERVER__) {
    require.ensure([], () => {
        require('../containers/HomePage').HomePageFromStore;
    });
}

function asyncLoadHomePageComponent(nextState: RouterState, callback) {
    require.ensure([], () => {
        callback(null, require('../containers/HomePage').HomePageFromStore);
    });
    return undefined;
}

export const publicSiteRoutes = (
    <Route component={AppFromStore}>
        <Route path="/" component={HomePageFromStore} >
            <Route path="wizard/*" />
        </Route>

        <Route path="/:homeBannerAdId" getComponent={asyncLoadHomePageComponent} />
    </Route>
);
