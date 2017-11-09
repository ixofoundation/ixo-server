import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../src/server/utils/cryptoUtil";
import chalk from 'chalk';

var figlet = require('figlet');

module.exports = function generateSdidCommand(program) {
    'use strict';

    program
        .command('createDID')
        .description('Generates SDID')
        .action(function () {

                console.log(
                    chalk.blue(
                        figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                    )
                );

                console.log(
                    chalk.red(
                        'SDID: ' + JSON.stringify(generateSdidFromMnemonic(program.mnemonic.toString()), null, '\t')
                    )
                );

            }
        )
    ;

}
;
