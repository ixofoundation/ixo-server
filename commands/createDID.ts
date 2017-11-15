import {generateBip39Mnemonic, generateSdidFromMnemonic} from "../src/server/utils/cryptoUtil";
import {CommandHelper} from "../bin/commandHelper";

module.exports = function createDIDCommand(program) {
    'use strict';
    program
        .command('createDID')
        .description('generates DID')
        .action(function () {
                var sdid;
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();
                if (typeof program.mnemonic !== 'undefined') {
                    ch.logCliResult('Mnemonic: ', program.mnemonic);
                    sdid = generateSdidFromMnemonic(program.mnemonic);
                    ch.logCliResult('SDID: ', sdid);
                } else {
                    ch.logCliResult('Generating mnemonic...');
                    const mnemonic = generateBip39Mnemonic();
                    ch.logCliResult('Mnemonic: ', mnemonic);

                    sdid = generateSdidFromMnemonic(mnemonic);
                    ch.logCliResult('SDID: ', sdid);
                }
                ch.writeToFile(sdid);
            }
        );
};

