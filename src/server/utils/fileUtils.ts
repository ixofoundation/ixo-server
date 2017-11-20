import chalk from "chalk";

var fileSystem = require('fs');

export function readFromFile(filename: string) {
    return JSON.parse(fileSystem.readFileSync(process.env.PWD + '/public/tmp/' + filename, 'utf8'));
}

export function writeToFile(fileName, content) {
    fileSystem.writeFile(process.env.PWD + '/public/tmp/' + fileName + '.json', JSON.stringify(content, null, '\t'), function (err) {
        if (err) {
            return console.error(err);
        }
        logCliResult('File created!')
    }.bind(this));
}

function logCliResult(key: any, value?: any) {
    if (typeof value === 'undefined') {
        console.log(chalk.red(key));
    } else {
        console.log(chalk.red(key) + chalk.yellowBright(JSON.stringify(value, null, '\t')));
    }
}