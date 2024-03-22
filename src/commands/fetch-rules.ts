import { ArgumentsCamelCase, Argv } from 'yargs';
import prompts from 'prompts';
import { logger } from '../logger';
import { bold, blue, green } from 'picocolors';
import { EPR_RULE_URL } from '../constants';
import { ruleFetcherFactory } from '../rule-fetcher-factory';
import { fetchRules } from '../fetch-rules';

interface FetchRulesArgv {
  url?: string;
}

export const command = 'fetch-rules';
export const describe = 'Fetches rules from the specified URL';
export const aliases = [];

export function builder(yargs: Argv): Argv<FetchRulesArgv> {
  return yargs.option('url', {
    type: 'string',
  });
}

export async function handler(argv: ArgumentsCamelCase<FetchRulesArgv>) {
  let { url } = argv;

  if (!url) {
    const { url: promptedUrl } = await prompts({
      type: 'text',
      name: 'url',
      message: 'Specify the URL to the rules package specification:',
      initial: EPR_RULE_URL,
    });
    url = promptedUrl as string;
  }

  logger.log(bold(`${blue('Retrieving package info from: ')}${green(url)}`));
  const ruleFetcher = ruleFetcherFactory(url);
  const rules = await fetchRules({ ruleFetcher });
  logger.log(blue(bold('Rules have been retrieved.')));

  logger.info(green(bold('Rules:')), rules);
}
