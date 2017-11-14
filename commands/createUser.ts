import {readFromFile} from "../bin/utils";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";


module.exports = function createUserCommand(program) {
    'use strict';

    program
        .command('createUser')
        .description('creates new user')
        .action(function () {
                var isAllParamsPresent = true;
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.name === 'undefined') {
                    ch.logCliResult('name is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.country === 'undefined') {
                    ch.logCliResult('country is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.publicKey === 'undefined') {
                    ch.logCliResult('publicKey is a mandatory parameter');
                    isAllParamsPresent = false;
                }

                if (isAllParamsPresent) {
                    postTransaction(createDatabaseTransaction(readFromFile(program.did + '.json'), {
                        did      : program.did,
                        name     : program.name,
                        country  : program.country,
                        publicKey: program.publicKey
                    }, {description: 'New user ' + program.name + ' added.'}));
                }
            }
        );
};
