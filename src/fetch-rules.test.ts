import { fetchRules } from './fetch-rules';

describe('fetchRules', () => {
  it("calls the ruleFetcher's fetch method", async () => {
    const mockFetch = jest.fn();
    const mockRuleruleFetcher = { fetch: mockFetch };
    await fetchRules({ ruleFetcher: mockRuleruleFetcher });

    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
