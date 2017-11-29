import {createDatabaseTransaction, doesDidExist, postTransaction} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput, writeToFile} from "../src/server/utils/fileUtils";

var dateFormat = require('dateformat');

module.exports = function createProjectCommand(program) {
    'use strict';

    program
        .command('createProject')
        .description('creates new project')
        .action(function () {
                var isAllParamsPresent = true;
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.description === 'undefined') {
                    ch.logCliResult('description is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.start === 'undefined') {
                    ch.logCliResult('start date is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.end === 'undefined') {
                    ch.logCliResult('end is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.templateId === 'undefined') {
                    ch.logCliResult('templateId is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.number === 'undefined') {
                    ch.logCliResult('number is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.value === 'undefined') {
                    ch.logCliResult('value is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.country === 'undefined') {
                    ch.logCliResult('country is a mandatory parameter');
                    isAllParamsPresent = false;
                }
                if (typeof program.link === 'undefined') {
                    ch.logCliResult('link is a mandatory parameter');
                    isAllParamsPresent = false;
                }

                var template = readFileFromOutput(program.templateId + '.json');

                if (isAllParamsPresent) {
                    postTransaction(createDatabaseTransaction(readDIDFromFile(program.did + '.json'), {
                        ownerDid   : program.did,
                        createdOn  : dateFormat(new Date(), "isoDateTime"),
                        description: program.description,
                        uri        : program.link,
                        startDate  : program.start,
                        endDate    : program.end,
                        indicator  : template.indicator,
                        templateId : template.templateId,
                        number     : program.number,
                        usdValue   : program.value,
                        country    : program.country,
                        status     : 'NotStarted'
                    }, {description: 'New agent ' + program.name + ' added.'})).then(result => {
                        ch.logCliResult('Project Added: ', result.asset.data);
                        if (!(typeof program.output === 'undefined')) {
                            writeToFile(program.output, result.asset.data);
                        }
                    });

                }
            }
        );
};
