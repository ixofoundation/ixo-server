import {generateBip39Mnemonic} from "../src/server/utils/cryptoUtil";
import chalk from 'chalk';

var figlet = require('figlet');

module.exports = function generateMnemonicCommand(program) {
    'use strict';

    program
        .command('generateMnemonic')
        .description('Generates Mnemonic')
        .action(function () {

                console.log(
                    chalk.blue(
                        figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                    )
                );

                console.log(
                    chalk.red(
                        'Mnemonic: ' + generateBip39Mnemonic()
                    )
                );

            }
        )
    ;

}
;
