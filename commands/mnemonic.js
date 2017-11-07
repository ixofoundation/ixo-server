var bip39 = require('bip39');

module.exports = function generateMnemonicCommand(program) {
    'use strict';

    function generateBip39Mnemonic() {
        return bip39.generateMnemonic();
    }

    program
        .command('mnemonic <command>')
        .description('Generates Mnemonic')
        .action(function(command) {
                if(command == 'generate'){
                    console.log('Mnemonic : ' + generateBip39Mnemonic());

                } else {
                    console.log('Please enter the correct command');
                }
        }

        );

};
