import chalk from "chalk";

export function logCliResult(key: any, value?: any) {
    if (typeof value === 'undefined') {
        console.log(chalk.red(key));
    } else {
        console.log(chalk.red(key) + chalk.yellowBright(JSON.stringify(value, null, '\t')));
    }
}