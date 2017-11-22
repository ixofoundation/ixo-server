import {isProduction, isTest} from "../utils/environment";

const API_PATH = getConnectionURL();
const driver = require('bigchaindb-driver');

const dbConn = new driver.Connection(API_PATH, {
    app_id : process.env.IPDB_APP_ID,
    app_key: process.env.IPDB_APP_KEY
});

export function createDatabaseTransaction(sdid, asset, metadata?) {
    // Construct a transaction payload
    const tx = driver.Transaction.makeCreateTransaction(
        asset,
        metadata,
        // A transaction needs an output
        [driver.Transaction.makeOutput(
            driver.Transaction.makeEd25519Condition(sdid.verifyKey))
        ],
        sdid.verifyKey
    );

    // Sign the transaction with private keys
    const txSigned = driver.Transaction.signTransaction(tx, sdid.secret.signKey);
    return txSigned;
}

export function queryDB(query: string): any {
    dbConn.searchAssets(query)
        .then(result => {
            if (result.length !== null) {
                console.log('Query results: ', JSON.stringify(result, null, '\t'));
                return result;
            } else {
                return null
            }
        });
}

export function doesDidExist(did: string): any {
    return dbConn.searchAssets(did);
}

export async function postTransaction(txSigned: any) {
    try {
        return await dbConn.postTransaction(txSigned)
            .then(() => dbConn.pollStatusAndFetchTransaction(txSigned.id));
    } catch (err) {
        throw new Error(err);
    }
}

// Return connection URL for the current environment
export function getConnectionURL(): string {
    if (isProduction()) {
        return process.env.IPDB_DB_CONNECTION_URL_PROD;
    } else if (isTest()) {
        return process.env.IPDB_DB_CONNECTION_URL_TEST;
    } else {
        return process.env.IPDB_DB_CONNECTION_URL_DEV;
    }
}


