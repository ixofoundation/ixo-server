import {CommandHelper} from "../bin/commandHelper";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {readDIDFromFile, readFileFromInput} from "../src/server/utils/fileUtils";

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
                    signDocument(readDIDFromFile(program.did), readFileFromInput(program.input), program.input);
                }
            }
        );
};
