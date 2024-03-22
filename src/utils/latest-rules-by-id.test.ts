import { getMockRules } from '../mocks/mock-rule';
import { groupRules, latestRulesById, uniqueBy } from './latest-rules-by-id';

describe('rule grouping utilities', () => {
  describe('groupRules', () => {
    it('groups rules by the specified key', () => {
      const rules = getMockRules(3);

      expect(groupRules(rules, (rule) => rule.id)).toEqual(
        expect.objectContaining({
          'mock-rule-id-0': [rules[0]],
          'mock-rule-id-1': [rules[1]],
          'mock-rule-id-2': [rules[2]],
        }),
      );
    });

    it('groups rules with the same key', () => {
      const rules = getMockRules(3, { name: 'same-rule-name' });

      expect(groupRules(rules, (rule) => rule.name)).toEqual({
        'same-rule-name': rules,
      });
    });
  });

  describe('uniqueBy', () => {
    it('returns a unique list of rules if all have different keys', () => {
      const rules = getMockRules(3);

      expect(uniqueBy(rules, (rule) => rule.id)).toHaveLength(3);
    });

    it('returns a unique list of rules if all cannot have the same key', () => {
      const rules = getMockRules(3);

      expect(uniqueBy(rules, () => String(Math.random()))).toHaveLength(3);
    });

    it('returns a single rule if all have the same key', () => {
      const rules = getMockRules(3);

      expect(uniqueBy(rules, () => 'same-key')).toHaveLength(1);
    });

    it('returns the last encountered rule if all have the same key', () => {
      const rules = getMockRules(3);

      expect(uniqueBy(rules, () => 'same-key')).toEqual([rules[2]]);
    });
  });

  describe('latestRulesById', () => {
    it('returns a single rule if all have the same id', () => {
      const rules = getMockRules(3, { id: 'same-rule-id' });

      expect(latestRulesById(rules)).toHaveLength(1);
    });

    it('returns the latest rule for each unique rule id', () => {
      const rules = getMockRules(3);

      expect(latestRulesById(rules)).toHaveLength(3);
    });

    it('ignores the version suffix when determining the rule identifier', () => {
      const rules = getMockRules(3).map((rule, index) => ({ ...rule, id: `same-id-prefix_${index}` }));

      expect(latestRulesById(rules)).toHaveLength(1);
    });

    it('returns the latest rule if encountered later in the list', () => {
      const rules = getMockRules(3).map((rule, index) => ({ ...rule, id: 'same-rule-id', version: index }));

      expect(latestRulesById(rules)).toEqual([expect.objectContaining({ version: 2 })]);
    });

    it('returns the latest rule if encountered later in the list', () => {
      const rules = getMockRules(3)
        .map((rule, index) => ({ ...rule, id: 'same-rule-id', version: index }))
        .reverse();

      expect(latestRulesById(rules)).toEqual([expect.objectContaining({ version: 2 })]);
    });
  });
});
