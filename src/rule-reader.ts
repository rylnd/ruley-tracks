import { extname, join } from 'path';
import { readFileSync, readdirSync } from 'fs';
import { Rule } from './types';

const isJSONFile = (file: string) => extname(file) === '.json';

/**
 *
 * @param rulesPath the path to the directory of rule files. Each file is expected to be a JSON file.
 * @returns a list of {@link Rule} objects
 */
export const readRules = async (rulesPath: string): Promise<Rule[]> => {
  const ruleFiles = readdirSync(rulesPath).filter(isJSONFile);

  const rules: Rule[] = [];
  for (const ruleFile of ruleFiles) {
    const ruleFileData = readFileSync(join(rulesPath, ruleFile));
    const rule = JSON.parse(ruleFileData.toString());
    // console.log('rule', JSON.stringify(rule, null, 2));

    rules.push({ id: rule.id, name: rule.attributes.name, type: rule.type, version: rule.attributes.version });
  }

  return rules;
};
