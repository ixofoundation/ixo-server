import {logCliResult} from "../bin/utils";
import {queryDB} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";


module.exports = function getUserCommand(program) {
    'use strict';

    program
        .command('getUser')
        .description('fetches user from database')
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
