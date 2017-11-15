import {queryDB} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";


module.exports = function getAgentCommand(program) {
    'use strict';

    program
        .command('getAgent')
        .description('fetches agent from database')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did !== 'undefined') {
                    queryDB(program.did);
                } else {
                    ch.logCliResult('did is a mandatory parameter');
                }
            }
        );
};
