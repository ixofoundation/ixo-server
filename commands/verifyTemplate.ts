import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFromFile,} from "../src/server/utils/fileUtils";
import {verifyDocumentSignature} from "../src/server/utils/cryptoUtil";

module.exports = function verifyTemplateCommand(program) {
    'use strict';

    program
        .command('verifyTemplate')
        .description('verify template')
        .action(function () {
                var isAllParamsPresent = true;
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did == 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                    isAllParamsPresent = false;
                } else if (typeof program.templateId == 'undefined') {
                    ch.logCliResult('templateId is a mandatory parameter');
                    isAllParamsPresent = false;
                }

                var template = readFromFile(program.templateId + '.json');
                var sdid = readDIDFromFile(program.did + '.json');

                if (isAllParamsPresent) {
                    ch.logCliResult('Verification passed: ', verifyDocumentSignature(template.signature.signatureValue, sdid.verifyKey));
                }
            }
        );
};

