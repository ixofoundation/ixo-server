import {logCliResult, readFromFile} from "../bin/utils";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";


module.exports = function createUserCommand(program) {
    'use strict';

    program
        .command('createUser')
        .description('creates new user')
        .action(function () {
                var isAllParamsPresent = true;

                if (typeof program.did === 'undefined') {
                    logCliResult('did is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.name === 'undefined') {
                    logCliResult('name is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.country === 'undefined') {
                    logCliResult('country is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.publicKey === 'undefined') {
                    logCliResult('publicKey is a mandatory parameter');
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
