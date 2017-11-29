import {queryDB} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";


module.exports = function listProjectsCommand(program) {
    'use strict';

    program
        .command('listProjects')
        .description('fetches project list from database')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                //TODO: Update this call once we can write proper db queries (Only using did param)
                if (typeof program.did !== 'undefined') {
                    queryDB(program.did).then(results =>
                        ch.logCliResult('Project List: ', results));
                } else {
                    ch.logCliResult('did is a mandatory parameter');
                }
            }
        );
};
