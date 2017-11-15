import {queryDB} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";


module.exports = function listAgentCommand(program) {
    'use strict';

    program
        .command('listAgent')
        .description('fetches agent list from database')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.country !== 'undefined') {
                    queryDB(program.country);
                } else {
                    ch.logCliResult('country is a mandatory parameter');
                }
            }
        );
};
