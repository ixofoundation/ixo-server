import {combineReducers, Reducer} from 'redux';
import {userReducer, IUserModelState} from './user/user_reducer';

// State of the admin panel store
export interface IPublicSiteStoreState {
    userStore       : IUserModelState
}

export const publicSiteReducer : Reducer<IPublicSiteStoreState> = combineReducers({
    userStore       : userReducer
    // Add other reducers here
}) as Reducer<IPublicSiteStoreState>;
