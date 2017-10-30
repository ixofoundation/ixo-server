import {MongoClient, Db} from 'mongodb';
import {isProduction, isTest} from '../utils/environment';

// Exhaustive list of all the document names
export const COLLECTIONS = {
    USERS             : 'users',
};

// Return connection URL for the current environment
export function getConnectionURL(): string {
    if(isProduction()) {
        return process.env.MONGO_DB_CONNECTION_URL_PROD;
    } else if(isTest()) {
        return process.env.MONGO_DB_CONNECTION_URL_TEST;
    } else {
        return process.env.MONGO_DB_CONNECTION_URL_DEV;
    }
}

// Create an open connection to mongodb. Database connection is
// made in the 'server.tsx' file when the application is started
export function connectToDb(): Promise<Db> {
    // Tell mongodb what promise library to use
    const promiseConfig = {promiseLibrary: Promise};
    return MongoClient.connect(getConnectionURL(), promiseConfig)
        .then((db: Db) => {
            return db;
        });
}
