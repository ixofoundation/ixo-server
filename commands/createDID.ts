import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../src/server/utils/cryptoUtil";
import chalk from 'chalk';
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";

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
                    console.log(
                        chalk.red(
                            'SDID: ' + JSON.stringify(sdid, null, '\t'))
                    );
                } else {
                    console.log('Generating mnemonic...');
                    const mnemonic = generateBip39Mnemonic();
                    console.log(
                        chalk.yellow(
                            'Mnemonic: ' + JSON.stringify(mnemonic, null, '\t'))
                    );
                    sdid = generateSdidFromMnemonic(mnemonic);

                    console.log(
                        chalk.red(
                            'SDID: ' + JSON.stringify(sdid, null, '\t')
                        )
                    );
                }

                postTransaction(createDatabaseTransaction(sdid, {ns: 'ipld.ixo.dix'}, {what: 'Create the DIX'}));
            }
        );
};

