import {CommandHelper} from "../bin/commandHelper";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {readDIDFromFile, readFileFromInput, writeToFile} from "../src/server/utils/fileUtils";
import {createTemplateJson, templateSchema} from "../src/server/templates/template";
import {isValidJson} from "../src/server/utils/jsonUtils";
import {signDocument} from "../src/server/utils/cryptoUtil";

var dateFormat = require('dateformat');

var merge = require('merge');

module.exports = function registerTemplateCommand(program) {
    'use strict';

    program
        .command('registerTemplate')
        .description('register template')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did == 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.input == 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                } else {

                    var sdid = readDIDFromFile(program.did + '.json');
                    var templateInput = readFileFromInput(program.input);

                    postTransaction(createDatabaseTransaction(sdid, {
                        did       : program.did,
                        templateId: sdid.verifyKey,
                        template  : templateInput
                    })).then(result => {
                        var templateJson = createTemplateJson(result.id, dateFormat(new Date(), "isoDateTime"), sdid.did, "P1261.23", templateInput);
                        ch.logCliResult('Registered Template: ', result);
                        if (isValidJson(templateSchema, templateJson)) {
                            writeToFile(result.id + '.json', templateJson);
                        } else {
                            ch.logCliResult('Template json validation failed!');
                        }
                    });

                }
            }
        );
};

