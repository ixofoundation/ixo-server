import {IUserDbModel} from '../../../server/db/models';

export module USER__SIGN_IN__INIT {
    export var type = 'USER__SIGN_IN__INIT';
}

export interface USER__SIGN_IN__INIT {
}

export module USER__SIGN_IN__SUCCESS {
    export var type = 'USER__SIGN_IN__SUCCESS';
}

export interface USER__SIGN_IN__SUCCESS {
    user: IUserDbModel
}

export module USER__SIGN_IN__FAILURE {
    export var type = 'USER__SIGN_IN__FAILURE';
}

export interface USER__SIGN_IN__FAILURE {
    error: Object;
}
