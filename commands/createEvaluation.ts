import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, writeToFile} from "../src/server/utils/fileUtils";
import {isValidJson, resolveEvaluationResults} from "../src/server/utils/jsonUtils";
import {createEvaluationJson, evaluation} from "../src/server/templates/evaluation";

var dateFormat = require('dateformat');

module.exports = function createEvaluationCommand(program) {
    'use strict';

    program
        .command('createEvaluation')
        .description('creates new evaluation')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.claimsetId === 'undefined') {
                    ch.logCliResult('claimsetId is a mandatory parameter');
                } else if (typeof program.result === 'undefined') {
                    ch.logCliResult('result is a mandatory parameter');
                } else {
                    var sdid = readDIDFromFile(program.did);
                    var evalResult = resolveEvaluationResults(program.result);
                    var comment = '';
                    if (typeof program.comment !== 'undefined') {
                        comment = program.comment;
                    }

                    var evaluationJson = createEvaluationJson(program.claimsetId, evalResult, sdid.did, dateFormat(new Date(), "isoDateTime"), comment)

                    if (isValidJson(evaluation, evaluationJson)) {
                        writeToFile(evaluationJson.issuer + '_' + evaluationJson.type + '.json', evaluationJson);
                        ch.logCliResult('Evaluation Results: ', evaluationJson);
                    }

                }


            }
        );
};
