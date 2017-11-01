import {IUserModel} from "../../models";

interface IMongoDbId {
    _id: string
}

export interface IUserDbModel extends IUserModel, IMongoDbId {
}

