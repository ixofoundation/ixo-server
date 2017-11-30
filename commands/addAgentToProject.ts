import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput} from "../src/server/utils/fileUtils";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {createRoleJson} from "../src/server/templates/role";

var dateFormat = require('dateformat');

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
                    var roleInput = readFileFromOutput(program.input);
                    var newRoleJson = createRoleJson(roleInput.role.type, roleInput.dixID, roleInput.role.did, roleInput.id, program.did, dateFormat(new Date(), "isoDateTime"));
                    ch.logCliResult('Document signed using signature: ' + signDocument(readDIDFromFile(program.did), newRoleJson, roleInput.role.did + '_' + roleInput.role.type + '_signed.json'));
                }
            }
        );
};
