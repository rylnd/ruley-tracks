import { Rule } from '../types';

export const getMockRule = (overrides: Partial<Rule> = {}): Rule => ({
  id: 'mock-rule-id',
  name: 'mock-rule-name',
  type: 'mock-rule-type',
  version: 1,
  ...overrides,
});

export const getMockRules = (count: number, overrides: Partial<Rule> = {}): Rule[] =>
  Array.from({ length: count }, (_, index) => getMockRule({ id: `mock-rule-id-${index}`, ...overrides }));
