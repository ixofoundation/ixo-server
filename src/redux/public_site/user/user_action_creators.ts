/** Create action to generate mnemonic for user */

import {createAction} from "../../../lib/redux_utils/actions";
import {
    USER__GENERATE_MNEOMONIC__FAILURE, USER__GENERATE_MNEOMONIC__INIT,
    USER__GENERATE_MNEOMONIC__SUCCESS
} from "./user_actions";
import {fetchGetJSON} from "../../../lib/redux_utils/fetch_utils";

export function generateMnemonic() {
    return dispatch => {
        dispatch(createAction(USER__GENERATE_MNEOMONIC__INIT.type, {}));
        fetchGetJSON(`/api/mnemonic/`)
            .then((result: string) => {
                dispatch(
                    createAction<USER__GENERATE_MNEOMONIC__SUCCESS>(USER__GENERATE_MNEOMONIC__SUCCESS.type, {
                        mnemonic: result
                    })
                );
            })
            .catch((result) => {
                dispatch(
                    createAction<USER__GENERATE_MNEOMONIC__FAILURE>(USER__GENERATE_MNEOMONIC__FAILURE.type, {
                        error: result['error']
                    })
                );
            });
    }
}

