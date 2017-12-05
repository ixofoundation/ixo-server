import {CommandHelper} from "../bin/commandHelper";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {readDIDFromFile, readFileFromInput, writeToFile} from "../src/server/utils/fileUtils";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";

var merge = require('merge');

module.exports = function submitProjectCommand(program) {
    'use strict';

    program
        .command('submitProject')
        .description('signs project with did signKey')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did == 'undefined') {
                    ch.logCliResult('agent is a mandatory parameter');
                } else if (typeof program.input == 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                } else {
                    var sdid = readDIDFromFile(program.did);
                    var projectJson = readFileFromInput(program.input);

                    var signature = signDocument(sdid, readFileFromInput(program.input));
                    postTransaction(createDatabaseTransaction(sdid, merge(projectJson, signature), {description: 'New project created by ' + program.did})).then(result => {
                        ch.logCliResult('Project Added: ', result.asset.data);
                        if (!(typeof program.output === 'undefined')) {
                            writeToFile(program.output, merge({"id": result.id}, result.asset.data));
                        }
                    });
                }
            }
        );
};
