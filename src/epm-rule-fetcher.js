import { EPM_RULE_URL } from './constants';

class EpmRuleFetcher {
  constructor(url) {
    this.rules = [];
    this.url = url || EPM_RULE_URL
  }

  fetch() {
    // fetch rules from server
    this.rules = [
      { id: 1, name: 'Rule 1' },
      { id: 2, name: 'Rule 2' }
    ];
  }
}
