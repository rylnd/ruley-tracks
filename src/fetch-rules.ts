import { Rule, IRuleFetcher } from './types';

interface FetchRulesArgs {
  ruleFetcher: IRuleFetcher;
}

const fetchRules = ({ ruleFetcher }: FetchRulesArgs): Promise<Rule[]> => {
  return ruleFetcher.fetch();
};

export { fetchRules };
