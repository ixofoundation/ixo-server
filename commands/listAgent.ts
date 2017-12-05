import {queryDB} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";


module.exports = function listAgentsCommand(program) {
    'use strict';

    program
        .command('listAgents')
        .description('fetches agents list from database')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.country !== 'undefined') {
                    queryDB(program.country).then(results =>
                        ch.logCliResult('Agents List: ', results));
                } else {
                    ch.logCliResult('country is a mandatory parameter');
                }
            }
        );
};
