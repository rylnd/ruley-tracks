import test from 'ava';
import sinon from 'sinon';

import { fetchRules } from './fetch-rules.js';

test('calls the ruleFetcher with the passed URL', async (t) => {
  const url = 'http://example.com';
  const ruleFetcher = sinon.spy();
  await fetchRules({ ruleFetcher, url });

  t.true(ruleFetcher.calledWith(url));
});
