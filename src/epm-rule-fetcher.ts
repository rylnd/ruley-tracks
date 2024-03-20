import { EPM_RULE_URL } from './constants'
import { Rule, RuleFetcher } from './types'

export class EpmRuleFetcher implements RuleFetcher {
  private url: string
  private rules: Rule[]
  constructor(url: string) {
    this.url = url || EPM_RULE_URL
    this.rules = []
  }

  fetch() {
    // TODO fetch rules from server
    this.rules = [{ name: 'Rule 1' }, { name: 'Rule 2' }]

    return Promise.resolve(this.rules)
  }
}
