import {CommandHelper} from "../bin/commandHelper";
import {readFileFromInput, writeToFile} from "../src/server/utils/fileUtils";
import {claimSetSchema, createClaimSetJson} from "../src/server/templates/claimSet";
import {isValidJson} from "../src/server/utils/jsonUtils";

module.exports = function createClaimSetCommand(program) {
    'use strict';

    program
        .command('createClaimSet')
        .description('creates new claim set')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.dixProjectID === 'undefined') {
                    ch.logCliResult('dixProjectID is a mandatory parameter');
                } else if (typeof program.files === 'undefined') {
                    ch.logCliResult('files is a mandatory parameter');
                } else {

                    var claimListFiles = program.files.split(',');
                    var claimListJson = [];

                    for (var i in claimListFiles) {
                        claimListJson.push(readFileFromInput(claimListFiles[i]));
                    }

                    var claimSetJson = createClaimSetJson(program.dixProjectID, claimListJson);
                    if (isValidJson(claimSetSchema, claimSetJson)) {
                        if (typeof program.output !== 'undefined') {
                            writeToFile(program.output, claimSetJson);
                        }
                        ch.logCliResult("Claim set Result: ", claimSetJson);
                    }
                }


            }
        );
};
