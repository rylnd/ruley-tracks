export type Rule = {
  name: string;
  type: string;
};

export type RuleFetcher = {
  fetch: () => Promise<Rule[]>;
};
