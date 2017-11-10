#!/usr/bin/env ts-node
require('dotenv').config();
import * as program from "commander";

var packageJson = require('../package.json');
var commands = require('../commands')(program);

program.LOG_PATH = process.env.HOME + '/.cli-log';
program
    .version(packageJson.version)
    .usage('<command> [options]')
    .option('-d, --debug', 'show debug info')
    .option('-m, --mnemonic', 'mnemonic');

program.prompt = require('prompt');

program.parse(process.argv);