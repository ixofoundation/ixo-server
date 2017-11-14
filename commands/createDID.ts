import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../src/server/utils/cryptoUtil";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {logCliResult, writeToFile} from "../bin/utils";

module.exports = function createDIDCommand(program) {
    'use strict';
    program
        .command('createDID')
        .description('generates DID')
        .action(function () {
                var sdid;
                if (typeof program.mnemonic !== 'undefined') {
                    logCliResult('Mnemonic: ', program.mnemonic);
                    sdid = generateSdidFromMnemonic(program.mnemonic);
                    logCliResult('SDID: ', sdid);
                } else {
                    logCliResult('Generating mnemonic...');
                    const mnemonic = generateBip39Mnemonic();
                    logCliResult('Mnemonic: ', mnemonic);

                    sdid = generateSdidFromMnemonic(mnemonic);
                    logCliResult('SDID: ', sdid);
                }
                writeToFile(sdid);
                postTransaction(createDatabaseTransaction(sdid, {ns: 'ipld.ixo.dix'}, {what: 'Create the DIX'}));
            }
        );
};

