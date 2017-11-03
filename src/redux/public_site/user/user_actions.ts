import {ISovrinDidModel} from "../../../server/db/models";

export module USER__GENERATE_MNEOMONIC__INIT {
    export var type = 'USER__GENERATE_MNEOMONIC__INIT';
}

export interface USER__GENERATE_MNEOMONIC__INIT {
}

export module USER__GENERATE_MNEOMONIC__SUCCESS {
    export var type = 'USER__GENERATE_MNEOMONIC__SUCCESS';
}

export interface USER__GENERATE_MNEOMONIC__SUCCESS {
    mnemonic: string
}

export module USER__GENERATE_MNEOMONIC__FAILURE {
    export var type = 'USER__GENERATE_MNEOMONIC__FAILURE';
}

export interface USER__GENERATE_MNEOMONIC__FAILURE {
    error: Object;
}

export module USER__GENERATE_SDID__INIT {
    export var type = 'USER__GENERATE_SDID__INIT';
}

export interface USER__GENERATE_SDID__INIT {
    mnemonic: string;
}

export module USER__GENERATE_SDID__SUCCESS {
    export var type = 'USER__GENERATE_SDID__SUCCESS';
}

export interface USER__GENERATE_SDID__SUCCESS {
    sdid: ISovrinDidModel
}

export module USER__GENERATE_SDID__FAILURE {
    export var type = 'USER__GENERATE_SDID__FAILURE';
}

export interface USER__GENERATE_SDID__FAILURE {
    error: Object;
}
