import { EprRuleFetcher } from './epr-rule-fetcher';
import { HttpClient } from './http-client';
import { IRuleFetcher } from './types';

export const ruleFetcherFactory = (url: string): IRuleFetcher => {
  const httpClient = new HttpClient();

  if (url.includes('epr.elastic.co')) {
    return new EprRuleFetcher({ url, client: httpClient });
  } else {
    throw new Error(`Unable to fetch rules for unrecognized URL: [${url}]`);
  }
};
