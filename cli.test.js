import test from 'ava';
import execa from 'execa';

test('cli.js', async (t) => {
  const { stdout } = await execa('./cli.js', ['ponies']);
  t.is(stdout, "ponies { postfix: 'rainbows' }\nundefined");
});
