import {generateBip39Mnemonic} from "../src/server/utils/cryptoUtil";
import chalk from 'chalk';

var figlet = require('figlet');
var inquirer = require('inquirer');

module.exports = function generateMnemonicCommand(program) {
    'use strict';

    program
        .command('mnemonic')
        .description('Generates Mnemonic')
        .action(function () {

                console.log(
                    chalk.blue(
                        figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                    )
                );

                console.log('Hi, welcome to the ixo Protocol CLI:');

                var questions = [
                        {
                            type    : 'input',
                            name    : 'mnemonic',
                            message : 'Do you want to generate a mnemonic? y/n',
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
