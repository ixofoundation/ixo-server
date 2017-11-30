import {doesDidExist} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";
import {writeToFile} from "../src/server/utils/fileUtils";
import {createRoleJson, roleSchema} from "../src/server/templates/role";
import {isValidJson, resolveAgentRole} from "../src/server/utils/jsonUtils";

module.exports = function createAddAgentToProjectRequestCommand(program) {
    'use strict';

    program
        .command('createAddAgentToProjectRequest')
        .description('creates new request to add a agent to a project')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.dixProjectID === 'undefined') {
                    ch.logCliResult('dixProjectID is a mandatory parameter');
                } else if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.role === 'undefined') {
                    ch.logCliResult('role is a mandatory parameter');
                } else {
                    doesDidExist(program.did).then(result => {
                        if (result.length >= 1) {
                            ch.logCliResult('Agent Role: ', resolveAgentRole(program.role));
                            var roleJson = createRoleJson(resolveAgentRole(program.role), program.dixProjectID, program.did);

                            if (isValidJson(roleSchema, roleJson)) {
                                writeToFile(program.did + '_' + roleJson.role.type + '.json', roleJson);
                            }
                        } else {
                            ch.logCliResult('did does not exists');
                        }
                    });

                }
            }
        );
};
