import { Rule, RuleFetcher } from './types'

interface FetchRulesArgs {
  ruleFetcher: RuleFetcher
}

const fetchRules = ({ ruleFetcher }: FetchRulesArgs): Promise<Rule[]> => {
  return ruleFetcher.fetch()
}

export { fetchRules }
