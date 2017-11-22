import {CommandHelper} from "../bin/commandHelper";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {readDIDFromFile, readFromFile, writeToFile} from "../src/server/utils/fileUtils";

var merge = require('merge');

module.exports = function registerTemplateCommand(program) {
    'use strict';

    program
        .command('registerTemplate')
        .description('register template')
        .action(function () {
                var isAllParamsPresent = true;
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did == 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                    isAllParamsPresent = false;
                } else if (typeof program.input == 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                    isAllParamsPresent = false;
                }

                var sdid = readDIDFromFile(program.did + '.json');

                if (isAllParamsPresent) {

                    postTransaction(createDatabaseTransaction(sdid, {
                        did       : program.did,
                        templateId: sdid.verifyKey,
                        template  : readFromFile(program.input)
                    })).then(result => {
                        var resultJson = {
                            "templateId": result.id
                        };
                        ch.logCliResult('TemplateId: ', result.id);
                        writeToFile(result.id + '.json', merge(result.asset.data.template, resultJson));
                    });

                }
            }
        );
};

