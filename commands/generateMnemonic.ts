import {generateBip39Mnemonic} from "../src/server/utils/cryptoUtil";
import {logCliResult} from "../bin/utils";
import {CommandHelper} from "../bin/commandHelper";

module.exports = function generateMnemonicCommand(program) {
    'use strict';

    program
        .command('generateMnemonic')
        .description('generates mnemonic')
        .action(function () {
            var ch = new CommandHelper(program.verbose);
            ch.logHeader();
            ch.logCliResult('Mnemonic: ', generateBip39Mnemonic());
            }
        )
    ;

}
;
