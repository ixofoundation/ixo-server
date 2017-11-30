import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput, writeToFile} from "../src/server/utils/fileUtils";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {createRoleJson} from "../src/server/templates/role";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {runInNewContext} from "vm";

var dateFormat = require('dateformat');
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

                    ch.logCliResult('SIGNED DOC: ', roleInputSigned);

                    postTransaction(createDatabaseTransaction(readDIDFromFile(program.did), roleInputSigned,
                        {description: 'New agent ' + program.name + ' added.'})).then(result => {
                            ch.logCliResult('Result: ', result.asset.data);

                            writeToFile(result.asset.data.role.did + '_' + result.asset.data.role.type + '_signed.json', merge({"id": result.id}, result.asset.data));
                        }
                    );
                }
            }
        );
};
