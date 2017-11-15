'use strict'
import chalk from 'chalk';

var figlet = require('figlet');
var fileSystem = require('fs');

//var figlet = require('figlet');

export class CommandHelper {

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

    writeToFile(sdid) {
        fileSystem.writeFile(process.env.PWD + '/public/tmp/' + sdid.did + '.json', JSON.stringify(sdid, null, '\t'), function (err) {
            if (err) {
                return console.error(err);
            }
            this.logCliResult('File created!')
        }.bind(this));
    }

    readFromFile(filename: string) {
        return JSON.parse(fileSystem.readFileSync(process.env.PWD + '/public/tmp/' + filename, 'utf8'));
    }

}

