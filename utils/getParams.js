import chalk from 'chalk';

const { log } = console;

const ERROR_MESSAGE = `
    ${chalk.red('specify filename from ./parsers dir')}
    ${chalk.red('for example')} ${chalk.black.bgWhite('yarn start -- noita_perks')}
`;

export const getParams = async () => {
    const enableRepl = process.argv.indexOf('repl') !== -1;
    const headless = process.argv.indexOf('headless') !== -1;
    const screenshot = process.argv.indexOf('screenshot') !== -1;
    const block = process.argv.find((arg) => arg.includes('block=')) || '';
    const blockedResources = block
        ? block.replace('block=', '').split(',')
        : ['image', 'stylesheet', 'other', 'media', 'script'];

    let file = process.argv[2];
    if (!file) {
        log(ERROR_MESSAGE);
        throw new Error('no parser specified');
    }
    if (!/.+\.js$/.test(file)) {
        file += '.js';
    }

    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const { URL, parser } = await import(`../parsers/${file}`);

    return {
        URL,
        parser,
        resultFilename: `${file}on`,
        enableRepl,
        headless,
        screenshot,
        blockedResources,
    };
};
