import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../src/server/utils/cryptoUtil";
import chalk from 'chalk';

var figlet = require('figlet');

module.exports = function createDIDCommand(program) {
    'use strict';

    program
        .command('createDID')
        .description('Generates DID')
        .action(function () {
                console.log(
                    chalk.blue(
                        figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                    )
                );
                if (typeof program.mnemonic !== 'undefined') {
                    console.log(
                        chalk.red(
                            'SDID: ' + JSON.stringify(generateSdidFromMnemonic(program.mnemonic.toString()), null, '\t')
                        )
                    );
                } else {
                    console.log('Generating mnemonic...');
                    const mnemonic = generateBip39Mnemonic();
                    console.log(
                        chalk.yellow(
                            'Mnemonic: ' + mnemonic, null, '\t')
                    );

                    console.log(
                        chalk.red(
                            'SDID: ' + JSON.stringify(generateSdidFromMnemonic(mnemonic), null, '\t')
                        )
                    );
                }

            }
        )
    ;

}
;
