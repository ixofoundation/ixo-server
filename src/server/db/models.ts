import {IUserModel} from "../../models";

export var AGENT_ROLE = Object.freeze({'O': 'owner', 'S': 'service_agent', 'F': 'funding_agent', 'E': 'evaluation agent'});

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
