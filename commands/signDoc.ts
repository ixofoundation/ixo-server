import {CommandHelper} from "../bin/commandHelper";
import {signDocument} from "../src/server/utils/cryptoUtil";


module.exports = function signDocCommand(program) {
    'use strict';

    program
        .command('signDoc')
        .description('signs document with did signKey')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did !== 'undefined') {
                    signDocument(ch.readFromFile(program.did + '.json'), 'HELLO SIGN TEST');
                } else {
                    ch.logCliResult('did is a mandatory parameter');
                }
            }
        );
};
