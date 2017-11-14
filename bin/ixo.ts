#!/usr/bin/env ts-node
require('dotenv').config();
import * as program from "commander";

var packageJson = require('../package.json');
var commands = require('../commands')(program);

program.LOG_PATH = process.env.HOME + '/.cli-log';
program
    .version(packageJson.version)
    .usage('<command> [options]')
    .option('-m, --mnemonic <item>', 'mnemonic')
    .option('-d, --did <item>', 'digital identifier')
    .option('-n, --name <item>', 'name of the DID owner')
    .option('-p, --publicKey <item>', 'public key for did')
    .option('-c, --country <item>', 'two letter country code');

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
