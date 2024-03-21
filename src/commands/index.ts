import * as info from './info';
import * as greeting from './greeting';
import * as fetchRules from './fetch-rules';

import { CommandModule } from 'yargs';

export const commands: CommandModule[] = [info, greeting, fetchRules];
