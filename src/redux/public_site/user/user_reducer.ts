import {
    // Sign in actions
    USER__SIGN_IN__INIT,
    USER__SIGN_IN__SUCCESS,
    USER__SIGN_IN__FAILURE,

} from './user_actions';
import {createReducer} from "../../../lib/redux_utils/reducers";

export type IUserModelState = {
}

let initialState: IUserModelState = {
};


export let userReducer = createReducer<IUserModelState>(initialState, [
    // Sign in actions
    {
        action: USER__SIGN_IN__INIT,
        handler: (state: IUserModelState, action: USER__SIGN_IN__INIT) => {
            return {
                ...state,
                isAuthenticated: false
            }
        }
    },
    {
        action: USER__SIGN_IN__SUCCESS,
        handler: (state: IUserModelState, action: USER__SIGN_IN__SUCCESS) => {
            return {
                ...state,
                isAuthenticated: true
            }
        }
    },
    {
        action: USER__SIGN_IN__FAILURE,
        handler: (state: IUserModelState, action: USER__SIGN_IN__FAILURE) => {
            return {
                ...state,
                isAuthenticated: false
            }
        }
    }

]);
