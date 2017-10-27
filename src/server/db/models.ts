interface IMongoDbId {
    _id: string
}

export interface IUserDbModel extends IUserModel, IMongoDbId {
    createdOn: Date
}

export interface IUserModel {
    firstName: string,
    surname: string,
    email: string
}