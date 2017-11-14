import {generateBip39Mnemonic} from "../src/server/utils/cryptoUtil";
import {logCliResult} from "../bin/utils";

module.exports = function generateMnemonicCommand(program) {
    'use strict';

    program
        .command('generateMnemonic')
        .description('generates mnemonic')
        .action(function () {
                logCliResult('Mnemonic: ', generateBip39Mnemonic());
            }
        )
    ;

}
;
