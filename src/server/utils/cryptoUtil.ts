import * as crypto from 'crypto';
import * as sovrinDID from 'sovrin-did';
import {ISovrinDidModel} from "../db/models";



export function generateBip39Mnemonic(): Promise<any> {
    var bip39 = require('bip39');
    return bip39.generateMnemonic();
}

export function generateSdidFromMnemonic(mnemonic): Promise<ISovrinDidModel> {
    // Create sha256 hash from Menmonic
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex")

    // Convert SHA256 hash to Uint8Array
    var didSeed = new Uint8Array(32);
    for(var i=0; i < 32; ++i){
        didSeed[i] = parseInt(seed.substring(i*2, i*2+2), 16)
    }

    // Create the Sovrin DID
    return sovrinDID.fromSeed(didSeed);
}


