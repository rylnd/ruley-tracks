import { logger } from '../logger';
import { Rule } from '../types';

/**
 * A function that returns a key for the given rule. Used to e.g. group a list of rules by a specific property.
 */
type KeyFn = (rule: Rule) => string;

/**
 * A function that compares two rules and returns true if the candidate rule is newer than the current rule.
 * @param current the current rule
 * @param rule the candidate rule
 *
 * @returns true if the candidate rule is newer than the current rule
 */
type CompareFn = ({ rule, current }: { rule: Rule; current: Rule | undefined }) => boolean;

/**
 *
 * Groups rules by the specified key.
 *
 * @param rules the rules to group
 * @param getKey a function that returns the key to group by
 */
export const groupRules = (rules: Rule[], getKey: KeyFn): Record<string, Rule[]> =>
  rules.reduce<Record<string, Rule[]>>((acc, rule) => {
    const key = getKey(rule);
    const currentRules = acc[key] ?? [];
    currentRules.push(rule);
    acc[key] = currentRules;
    return acc;
  }, {});

/**
 *
 * Groups rules by the specified key and deduplicates via a predicate function.
 *
 * @param rules the rules to group
 * @param getKey a {@link KeyFn}function that returns the key to group by
 * @param shouldReplace a {@link CompareFn} function that determines if the candidate rule should replace the current rule
 * @returns a record of individual rules grouped by the specified key
 */
const groupAndDeduplicateRules = (
  rules: Rule[],
  getKey: KeyFn,
  shouldReplace: CompareFn = () => true,
): Record<string, Rule> =>
  rules.reduce<Record<string, Rule>>((acc, rule) => {
    const key = getKey(rule);
    const currentRule = acc[key];
    if (shouldReplace({ rule, current: currentRule })) {
      acc[key] = rule;
    }
    return acc;
  }, {});

/**
 * Returns a list of rules unique by a key, determined by the `getKey` function.
 * The first rule encountered with a specific key is kept, and all subsequent rules with the same key are discarded.
 *
 * @param rules the (potentially duplicated) list of rules to deduplicate
 * @param getKey a {@link KeyFn} function that returns the key determining uniqueness
 * @returns a list of rules unique by the specified key
 */
export const uniqueBy = (rules: Rule[], getKey: KeyFn): Rule[] =>
  Object.values(groupAndDeduplicateRules(rules, getKey, () => true));

const getRuleVersion = (rule: Rule): number => {
  const { id, version } = rule;
  const [_, parsedVersion] = id.split('_');

  if (!parsedVersion || String(version) !== parsedVersion) {
    logger.warn(`Version mismatch for rule ${id}: ${version} !== ${parsedVersion}`);
  }

  return version;
};

const isRuleNewerThanCurrent: CompareFn = ({ rule, current }) => {
  if (!current) {
    return true;
  }

  return getRuleVersion(rule) > getRuleVersion(current);
};

/**
 * Generates a list of the latest rules, determined by the rule's `version` property. A rule's identifier is taken from the `id` property, less the version suffix.
 *
 * @param rules A non-unique list of rules, with multiple versions of the same rule
 * @returns A list of the latest rules, with only the newest version of each rule
 */
export const latestRulesById = (rules: Rule[]): Rule[] =>
  Object.values(groupAndDeduplicateRules(rules, (rule) => rule.id.split('_')[0]!, isRuleNewerThanCurrent));
