import {logCliResult} from "../bin/utils";
import {queryDB} from "../src/server/db/db";


module.exports = function getUserCommand(program) {
    'use strict';

    program
        .command('getUser')
        .description('fetches user from database')
        .action(function () {
                if (typeof program.did !== 'undefined') {
                    queryDB(program.did);
                } else {
                    logCliResult('did is a mandatory parameter');
                }
            }
        );
};
