
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
