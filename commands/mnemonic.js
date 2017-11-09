var bip39 = require('bip39');
var figlet = require('figlet');
var chalk = require('chalk');
var inquirer = require('inquirer');

module.exports = function generateMnemonicCommand(program) {
    'use strict';

    function generateBip39Mnemonic() {
        return bip39.generateMnemonic();
    }

    program
        .command('start')
        .description('Generates Mnemonic')
        .action(function (command) {

                console.log(
                    chalk.blue(
                        figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                    )
                );

                console.log('Hi, welcome to the ixo Protocol CLI:');

                var questions = [
                        {
                            type: 'input',
                            name: 'mnemonic',
                            message: 'Do you want to generate a mnemonic? y/n',
                            validate: function (value) {
                                if (value == 'y') {
                                    console.log(
                                        chalk.red(
                                            '\nMnemonic: ' + generateBip39Mnemonic()
                                        )
                                    );
                                    return true;
                                } else {
                                    return 'You know you want to...';
                                }
                            }
                        }
                    ]
                ;

                inquirer.prompt(questions).then(function (answers) {
                    console.log(JSON.stringify(answers, null, '  '));
                });

            }
        )
    ;

}
;
