import {IUserModel} from "../../models";

export var AGENT_ROLE = Object.freeze({'O': 'owner', 'S': 'service_agent', 'F': 'funding_agent', 'E': 'evaluation_agent'});

export var PROJECT_STATUS = Object.freeze({'PENDING': 'project_pending', 'IN_PROGRESS': 'project_in_progress', 'FINISHED': 'project_finished'});

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
