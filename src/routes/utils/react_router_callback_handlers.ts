import {RouterState} from 'react-router';
import {RedirectFunction} from 'react-router';
import {getPublicStore} from '../../redux/public_site/store';
import {AsyncGetStatus} from "../../lib/redux_utils/async_get";
import {generateMnemonic} from "../../redux/public_site/user/user_action_creators";
import {isBrowser} from "../../utils/isomorphic_utils";

/** Home page onEnter handler */
export function handleHomePageEnter(nextState: RouterState, replace: RedirectFunction, callback: Function) {
    if (isBrowser()) {
        const publicStore = getPublicStore();
        // Trigger mnemonic fetch if they haven't been provided through html by the server
        if (publicStore.getState().userStore.mnemonic.status === AsyncGetStatus.NONE) {
            publicStore.dispatch(generateMnemonic());
        }
    }
    callback();
}

export function handleHomePageChange(prevState: RouterState, nextState: RouterState, replace: RedirectFunction, callback: Function) {

    callback();
}

export function handleHomePageLeave() {

}

