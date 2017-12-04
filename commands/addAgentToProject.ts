import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput, writeToFile} from "../src/server/utils/fileUtils";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";

var merge = require('merge');

module.exports = function addAgentToProjectCommand(program) {
    'use strict';

    program
        .command('addAgentToProject')
        .description('adds agent to project')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.input === 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                } else {
                    //Reads createAddAgentToProjectRequest file from output
                    var roleInput = readFileFromOutput(program.input);

                    //Generates a signature
                    var signature = signDocument(readDIDFromFile(program.did), roleInput);

                    //Adds the signature to the role
                    var roleInputSigned = merge(roleInput, signature);

                    ch.logCliResult('Signed role request: ', roleInputSigned);

                    postTransaction(createDatabaseTransaction(readDIDFromFile(program.did), roleInputSigned,
                        {description: 'New agent ' + program.name + ' added.'})).then(result => {
                            ch.logCliResult('Database Results: ', result.asset.data);
                            writeToFile(result.asset.data.role.did + '_' + result.asset.data.role.type + '_signed.json', merge({"id": result.id}, result.asset.data));
                        }
                    );
                }
            }
        );
};
