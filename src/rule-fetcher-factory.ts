import { EpmRuleFetcher } from './epm-rule-fetcher';
import { HttpClient } from './http-client';
import { IRuleFetcher } from './types';

export const ruleFetcherFactory = (url: string): IRuleFetcher => {
  const httpClient = new HttpClient();

  if (url.includes('epr.elastic.co')) {
    return new EpmRuleFetcher({ url, client: httpClient });
  } else {
    throw new Error('Unknown rule fetcher');
  }
};
