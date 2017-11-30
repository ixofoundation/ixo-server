import {doesDidExist} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";
import {writeToFile} from "../src/server/utils/fileUtils";
import {isValidJson} from "../src/server/utils/jsonUtils";
import {createRevokedRoleJson, revokedRoleSchema} from "../src/server/templates/revokeRole";

module.exports = function createRevokeAgentFromProjectRequestCommand(program) {
    'use strict';

    program
        .command('createRevokeAgentFromProjectRequest')
        .description('creates new revoke request to revoke an agent from a project')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.dixProjectID === 'undefined') {
                    ch.logCliResult('dixProjectID is a mandatory parameter');
                } else if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.roleID === 'undefined') {
                    ch.logCliResult('role is a mandatory parameter');
                } else {
                    doesDidExist(program.did).then(result => {
                        if (result.length >= 1) {
                            var revokedRoleJson = createRevokedRoleJson(program.dixProjectID, program.roleID);
                            if (isValidJson(revokedRoleSchema, revokedRoleJson)) {
                                writeToFile(program.dixProjectID + '_' + revokedRoleJson.roleID + '.json', revokedRoleJson);
                            }
                        } else {
                            ch.logCliResult('did does not exists');
                        }
                    });

                }
            }
        );
};
