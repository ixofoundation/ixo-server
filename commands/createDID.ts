import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../src/server/utils/cryptoUtil";
import chalk from 'chalk';
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {logCliResult, writeToFile} from "../bin/utils";

var figlet = require('figlet');


module.exports = function createDIDCommand(program) {
    'use strict';
    program
        .command('createDID')
        .description('Generates DID')
        .action(function () {
                var sdid;
                console.log(
                    chalk.blue(
                        figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                    )
                );
                if (typeof program.mnemonic !== 'undefined') {
                    sdid = generateSdidFromMnemonic(program.mnemonic.toString());
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

