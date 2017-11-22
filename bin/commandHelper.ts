import chalk from 'chalk';

var figlet = require('figlet');
var fileSystem = require('fs');

export class CommandHelper {
    'use strict';
    verbose: boolean;

    constructor(verboseValue: boolean) {
        this.verbose = (verboseValue);
    }

    setVerbose(value) {
        if (typeof value === 'undefined') {
            this.verbose = true;
        } else {
            this.verbose = false;
        }
    }

    logCliResult(key: any, value?: any) {
        if (this.verbose) {
            if (typeof value === 'undefined') {
                console.log(chalk.red(key));
            } else {
                console.log(chalk.red(key) + chalk.yellowBright(JSON.stringify(value, null, '\t')));
            }
        } else {
            console.log(JSON.stringify(value));
        }
    }

    logHeader() {
        if (this.verbose) {
            console.log(
                chalk.blue(
                    figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                )
            )
        }
    }

    logError(err) {
        if (this.verbose) {
            console.log(
                chalk.red(
                    figlet.textSync('ixo Protocol', {horizontalLayout: 'standard'})
                )
            )
        } else {
            console.error(err);
        }
    }

}

