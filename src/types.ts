export type Rule = {
  name: string
}

export type RuleFetcher = {
  fetch: () => Promise<Rule[]>
}
