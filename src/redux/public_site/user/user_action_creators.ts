/** Create action to generate mnemonic for user */

import {createAction} from "../../../lib/redux_utils/actions";
import {
    USER__GENERATE_MNEOMONIC__FAILURE, USER__GENERATE_MNEOMONIC__INIT,
    USER__GENERATE_MNEOMONIC__SUCCESS, USER__GENERATE_SDID__FAILURE, USER__GENERATE_SDID__INIT,
    USER__GENERATE_SDID__SUCCESS
} from "./user_actions";
import {fetchGetJSON} from "../../../lib/redux_utils/fetch_utils";
import {ISovrinDidModel} from "../../../server/db/models";

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

export function generateSDID(mnemonic: string) {
    return dispatch => {
        dispatch(createAction(USER__GENERATE_SDID__INIT.type, {mnemonic}));
        fetchGetJSON(`/api/sdid/${mnemonic}`)
            .then((result: ISovrinDidModel) => {
                dispatch(
                    createAction<USER__GENERATE_SDID__SUCCESS>(USER__GENERATE_SDID__SUCCESS.type, {
                        sdid: result
                    })
                );
            })
            .catch((result) => {
                dispatch(
                    createAction<USER__GENERATE_SDID__FAILURE>(USER__GENERATE_SDID__FAILURE.type, {
                        error: result['error']
                    })
                );
            });
    }
}

