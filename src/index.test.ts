import { commands } from './commands';

describe('CLI commands', () => {
  it('command "fetch-rules" is defined', () => {
    expect(commands).toEqual(expect.arrayContaining([expect.objectContaining({ command: 'fetch-rules' })]));
  });
});
