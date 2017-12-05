import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromInput, writeToFile} from "../src/server/utils/fileUtils";
import {signDocument} from "../src/server/utils/cryptoUtil";
import {createDatabaseTransaction, postTransaction} from "../src/server/db/db";

var merge = require('merge');

module.exports = function submitEvaluationCommand(program) {
    'use strict';

    program
        .command('submitEvaluation')
        .description('submit evaluation')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.input === 'undefined') {
                    ch.logCliResult('result is a mandatory parameter');
                } else {
                    var sdid = readDIDFromFile(program.did);
                    var evaluation = readFileFromInput(program.input);
                    var signature = signDocument(sdid, evaluation);
                    var signedEvaluation = merge(evaluation, signature);

                    postTransaction(createDatabaseTransaction(sdid, signedEvaluation,
                        {description: 'New evaluation done on claimSet: ' + evaluation.claimSetID})).then(result => {
                            ch.logCliResult('Database Results: ', result.asset.data);
                            writeToFile(program.input, merge({"id": result.id}, result.asset.data));
                        }
                    );

                }


            }
        );
};
