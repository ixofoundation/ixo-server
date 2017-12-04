import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput, writeToFile} from "../src/server/utils/fileUtils";
import {createClaimSetJson} from "../src/server/templates/claimSet";
import {createDatabaseTransaction, postTransaction, queryDB} from "../src/server/db/db";
import {signDocument} from "../src/server/utils/cryptoUtil";

var dateFormat = require('dateformat');
var merge = require('merge');

module.exports = function submitClaimSetCommand(program) {
    'use strict';

    program
        .command('submitClaimSet')
        .description('submits claim set')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.dixProjectID === 'undefined') {
                    ch.logCliResult('dixProjectID is a mandatory parameter');
                } else if (typeof program.input === 'undefined') {
                    ch.logCliResult('input is a mandatory parameter');
                } else {
                    //Retrieves project from DB
                    queryDB(program.dixProjectID).then(results => {
                            var templateId = results[0].data.templateId;
                            var claimSet = readFileFromOutput(program.input);
                            var sdid = readDIDFromFile(program.did + '.json');
                            var claimSetJson = createClaimSetJson(program.dixProjectID, claimSet, templateId, program.did, dateFormat(new Date(), "isoDateTime"));
                            var signature = signDocument(sdid, claimSetJson);
                            var signedClaimSetJson = merge(claimSetJson, signature);

                            postTransaction(createDatabaseTransaction(sdid, signedClaimSetJson,
                                {description: 'New claimSet added to project: ' + program.dixProjectID})).then(result => {
                                    ch.logCliResult('Database Results: ', result.asset.data);
                                    writeToFile(result.asset.data.dixID + '_' + result.asset.data.type + '_signed.json', result.asset.data);
                                }
                            );
                        }
                    );


                }


            }
        );
};
