import { ArgumentsCamelCase, Argv } from 'yargs';
import { logger } from '../logger';
import { bold, blue, green } from 'picocolors';
import { EPR_RULE_URL } from '../constants';
import { ruleFetcherFactory } from '../rule-fetcher-factory';

interface FetchRulesArgv {
  url?: string;
}

export const command = 'fetch-rules';
export const describe = 'Fetches rules from the specified URL';
export const aliases = [];

export function builder(yargs: Argv): Argv<FetchRulesArgv> {
  return yargs.option('url', {
    type: 'string',
    alias: 'f',
    default: EPR_RULE_URL,
  });
}

export async function handler(argv: ArgumentsCamelCase<FetchRulesArgv>) {
  const { url } = argv;
  if (!url) {
    throw new Error('This should never happen, because a default value is set!');
  }

  logger.info(blue('Using URL:'), url);

  const ruleFetcher = ruleFetcherFactory(url);
  const rules = await ruleFetcher.fetch();

  logger.info(green(bold('Rules:')), rules);
}
