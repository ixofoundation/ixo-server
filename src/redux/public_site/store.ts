import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import {publicSiteReducer, IPublicSiteStoreState} from "./public_site_reducer";
import {Middleware} from "redux";

const createLogger = require('redux-logger');
const logger = createLogger();
let publicStore : Redux.Store<IPublicSiteStoreState>;

/**
 * Creates the public store using the given preloadedState (optional)
 *
 * Note: If preloadedState is not provided, the store will be initialized as normally
 *
 * @param preloadedState    Preloaded state of the store
 */
export function createPublicSiteStore(preloadedState?: IPublicSiteStoreState) : Redux.Store<IPublicSiteStoreState> {
    const middlewares : Middleware[] = [thunk];
    publicStore = createStore.call(this, publicSiteReducer, preloadedState, applyMiddleware(...middlewares));
    return publicStore;
}

/**
 * Returns the public store (if it exists)
 */
export function getPublicStore(): Redux.Store<IPublicSiteStoreState> {
    return publicStore
}

/**
 * Returns the state of the store after being initialized (default values specified within reducers)
 *
 * Note: Use this method whenever you need to construct a valid store state to be used for preloading the store
 */
export function getInitializedStoreState() : IPublicSiteStoreState {
    return createPublicSiteStore().getState();
}
