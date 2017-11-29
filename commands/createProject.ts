import {createDatabaseTransaction, doesDidExist, postTransaction} from "../src/server/db/db";
import {CommandHelper} from "../bin/commandHelper";
import {readDIDFromFile, readFileFromOutput, writeToFile} from "../src/server/utils/fileUtils";
import {createProjectJson, projectSchema} from "../src/server/templates/project";
import {isValidJson, resolveProjectStatus} from "../src/server/utils/jsonUtils";
var merge = require('merge');
var dateFormat = require('dateformat');

module.exports = function createProjectCommand(program) {
    'use strict';

    program
        .command('createProject')
        .description('creates new project')
        .action(function () {
                var ch = new CommandHelper(program.verbose);
                ch.logHeader();

                if (typeof program.did === 'undefined') {
                    ch.logCliResult('did is a mandatory parameter');
                } else if (typeof program.description === 'undefined') {
                    ch.logCliResult('description is a mandatory parameter');
                } else if (typeof program.start === 'undefined') {
                    ch.logCliResult('start date is a mandatory parameter');
                } else if (typeof program.end === 'undefined') {
                    ch.logCliResult('end is a mandatory parameter');
                } else if (typeof program.templateId === 'undefined') {
                    ch.logCliResult('templateId is a mandatory parameter');
                } else if (typeof program.number === 'undefined') {
                    ch.logCliResult('number is a mandatory parameter');
                } else if (typeof program.value === 'undefined') {
                    ch.logCliResult('value is a mandatory parameter');
                } else if (typeof program.country === 'undefined') {
                    ch.logCliResult('country is a mandatory parameter');
                } else if (typeof program.link === 'undefined') {
                    ch.logCliResult('link is a mandatory parameter');
                } else if (typeof program.tolerance === 'undefined') {
                    ch.logCliResult('tolerance is a mandatory parameter');
                } else {
                    var template = readFileFromOutput(program.templateId + '.json');
                    var projectJson = createProjectJson(program.did, dateFormat(new Date(), "isoDateTime"), program.description, program.link, program.start, program.end, template.templateId, parseInt(program.number), parseInt(program.tolerance), parseInt(program.value), program.country, resolveProjectStatus("PENDING"));

                    ch.logCliResult('projectJson', projectJson);

                    if (isValidJson(projectSchema, projectJson)) {
                        postTransaction(createDatabaseTransaction(readDIDFromFile(program.did + '.json'), projectJson, {description: 'New project created by ' + program.did})).then(result => {
                            ch.logCliResult('Project Added: ', result.asset.data);
                            if (!(typeof program.output === 'undefined')) {
                                writeToFile(program.output, merge({"id": result.id}, result.asset.data));
                            }
                        });
                    } else {
                        ch.logCliResult('Invalid project JSON')
                    }
                }

            }
        );
};
