import * as crypto from 'crypto';
import * as sovrin from 'sovrin-did';
import {ISovrinDidModel} from "../db/models";
import {readFileFromInput, writeToFile} from "./fileUtils";
import {createSignatureJson, signatureSchema} from "../templates/signature";
import {isValidJson} from "./jsonUtils";

var dateFormat = require('dateformat');
var merge = require('merge');
var base58 = require('bs58');
var cc = require('five-bells-condition');

export function generateBip39Mnemonic(): Promise<any> {
    var bip39 = require('bip39');
    return bip39.generateMnemonic();
}

export function generateSdidFromMnemonic(mnemonic): Promise<ISovrinDidModel> {
    // Create sha256 hash from Menmonic
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex");

    // Convert SHA256 hash to Uint8Array
    var didSeed = new Uint8Array(32);
    for (var i = 0; i < 32; ++i) {
        didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
    }

    // Create the Sovrin DID
    return sovrin.fromSeed(didSeed);
}

export function verifyDocumentSignature(signature, publicKey): boolean {
    return !(sovrin.verifySignedMessage(base58.decode(signature), publicKey) === false);
}

//Signs a document using signKey from generated SDID and returns the signature
export function signDocument(sdid: ISovrinDidModel, inputFile, outputFile) {
    const fileToSign = readFileFromInput(inputFile);
    var signature = base58.encode(sovrin.signMessage(new Buffer(JSON.stringify(fileToSign)), sdid.secret.signKey, sdid.verifyKey));

    if (verifyDocumentSignature(signature, sdid.verifyKey)) {
        generateSignedDocument(outputFile, signature, fileToSign, cc.Ed25519Sha256.TYPE_NAME, sdid.did);
        return signature;
    } else {
        throw new Error('fulfillment validation failed');
    }
}

//Generates signature json and validates it against the schema template
export function generateSignedDocument(fileName, signature, content, type, did) {
    var signatureJson = createSignatureJson(type, dateFormat(new Date(), "isoDateTime"), did, signature);

    console.log(JSON.stringify(content, null, '\t'));
    console.log(JSON.stringify(signatureJson, null, '\t'));

    if (isValidJson(signatureSchema, signatureJson)) {
        writeToFile(fileName, merge(content, signatureJson));
    } else {
        throw new Error('signature json validation failed');
    }
}




