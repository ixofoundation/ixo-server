import {AsyncGet} from '../../../lib/redux_utils/async_get';
import {createReducer} from '../../../lib/redux_utils/reducers';
import {
    USER__GENERATE_MNEOMONIC__FAILURE, USER__GENERATE_MNEOMONIC__INIT,
    USER__GENERATE_MNEOMONIC__SUCCESS
} from "./user_actions";


export interface IUserModelState {
    mnemonic: AsyncGet<string>
}

let initialState: IUserModelState = {
    mnemonic: AsyncGet.init(null)
};

export let userReducer = createReducer<IUserModelState>(initialState, [
    {
        action: USER__GENERATE_MNEOMONIC__INIT,
        handler: (state: IUserModelState, action: USER__GENERATE_MNEOMONIC__INIT) => {
            return {
                ...state,
                mnemonic: AsyncGet.fetching(state.mnemonic)
            }
        }
    },
    {
        action: USER__GENERATE_MNEOMONIC__SUCCESS,
        handler: (state: IUserModelState, action: USER__GENERATE_MNEOMONIC__SUCCESS) => {
            return {
                ...state,
                mnemonic: AsyncGet.fetched(state.mnemonic, action.mnemonic)
            }
        }
    },
    {
        action: USER__GENERATE_MNEOMONIC__FAILURE,
        handler: (state: IUserModelState, action: USER__GENERATE_MNEOMONIC__FAILURE) => {
            return {
                ...state,
                mnemonic: AsyncGet.error(state.mnemonic, action.error)
            }
        }
    }
]);