import * as crypto from 'crypto';
import * as sovrinDID from 'sovrin-did';
import {ISovrinDidModel} from "../db/models";
import {readFromFile, writeToFile} from "./fileUtils";
import {createSignatureJson, isValidSignatureJson} from "../templates/signature";

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
    const seed = crypto.createHash('sha256').update(mnemonic).digest("hex")

    // Convert SHA256 hash to Uint8Array
    var didSeed = new Uint8Array(32);
    for (var i = 0; i < 32; ++i) {
        didSeed[i] = parseInt(seed.substring(i * 2, i * 2 + 2), 16)
    }

    // Create the Sovrin DID
    return sovrinDID.fromSeed(didSeed);
}

export function verifyDocumentSignature(fulfillment, condition, message): boolean {
    return cc.validateFulfillment(fulfillment, condition, message);
}

//Signs a document using signKey from generated SDID and returns the signature
export function signDocument(sdid: ISovrinDidModel, inputFile, outputFile) {
    const edPrivateKey = new Buffer(base58.decode(sdid.secret.signKey));
    const ed25519Fulfillment = new cc.Ed25519Sha256();
    const message = new Buffer(JSON.stringify(readFromFile(inputFile)));
    ed25519Fulfillment.sign(message, edPrivateKey);

    if (verifyDocumentSignature(ed25519Fulfillment.serializeUri(), ed25519Fulfillment.getConditionUri(), message)) {
        generateSignedDocument(outputFile, ed25519Fulfillment.serializeUri(), readFromFile(inputFile), cc.Ed25519Sha256.TYPE_NAME, sdid.did);
        return ed25519Fulfillment.serializeUri();
    } else {
        throw new Error('fulfillment validation failed');
    }
}

//Generates signature json and validates it against the schema template
export function generateSignedDocument(fileName, signature, content, type, did) {
    var signatureJson = createSignatureJson(type, dateFormat(new Date(), "isoDateTime"), did, signature);

    if (isValidSignatureJson(signatureJson)) {
        writeToFile(fileName, merge(content, signatureJson));
    } else {
        throw new Error('signature json validation failed');
    }
}




