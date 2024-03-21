import { EprRuleFetcher } from './epr-rule-fetcher';
import { ruleFetcherFactory } from './rule-fetcher-factory';

describe('ruleFetcherFactory', () => {
  it('returns an EprRuleFetcher when the URL is from EPR', () => {
    const url = 'https://epr.elastic.co';
    const ruleFetcher = ruleFetcherFactory(url);
    expect(ruleFetcher).toBeInstanceOf(EprRuleFetcher);
  });

  it('throws an error when the URL is not recognized', () => {
    const url = 'https://elastic.co';
    expect(() => ruleFetcherFactory(url)).toThrowError(
      'Unable to fetch rules for unrecognized URL: [https://elastic.co]',
    );
  });
});
