import {IUserModel} from "../../models";

interface IMongoDbId {
    _id: string
}

export interface IUserDbModel extends IUserModel, IMongoDbId {
}

export interface ISovrinDidModel {
    did: string
    verifyKey: string
    secret: ISovrinDidSecretModel

}

interface ISovrinDidSecretModel {
    seed: string
    signKey: string
}
