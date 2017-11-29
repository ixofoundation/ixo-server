import {CommandHelper} from "../bin/commandHelper";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {readDIDFromFile, readFileFromInput, writeToFile} from "../src/server/utils/fileUtils";
import {createTemplateJson, templateSchema} from "../src/server/templates/template";
import {isValidJson} from "../src/server/utils/jsonUtils";

var dateFormat = require('dateformat');

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
                        template  : readFileFromInput(program.input)
                    })).then(result => {
                        var templateJson = createTemplateJson(result.id, dateFormat(new Date(), "isoDateTime"), sdid.did, "P1261.23");
                        if (isValidJson(templateSchema, templateJson)) {
                            writeToFile(result.id + '.json', merge(templateJson, result.asset.data.template));
                        }
                    });

                }
            }
        );
};

