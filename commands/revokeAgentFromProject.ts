import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput, writeToFile} from "../src/server/utils/fileUtils";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";

var merge = require('merge');

module.exports = function revokeAgentFromProjectCommand(program) {
    'use strict';

    program
        .command('revokeAgentFromProject')
        .description('revokes agent from a project')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.input === 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                } else {
                    //Reads createAddAgentToProjectRequest file from output
                    var revokedRoleInput = readFileFromOutput(program.input);

                    //Generates a signature
                    var signature = signDocument(readDIDFromFile(program.did), revokedRoleInput);

                    //Adds the signature to the role
                    var revokedRoleInputSigned = merge(revokedRoleInput, signature);

                    ch.logCliResult('Signed revoke request: ', revokedRoleInputSigned);

                    postTransaction(createDatabaseTransaction(readDIDFromFile(program.did), revokedRoleInputSigned,
                        {description: 'New agent ' + program.name + ' added.'})).then(result => {
                            ch.logCliResult('Database Results: ', result.asset.data);

                            writeToFile(result.asset.data.dixID + '_' + result.asset.data.roleID + '_signed.json', merge({"id": result.id}, result.asset.data));
                        }
                    );
                }
            }
        );
};
