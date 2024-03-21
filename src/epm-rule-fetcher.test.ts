import { EpmRuleFetcher } from './epm-rule-fetcher';
import httpClientMock from './http-client.mock';
import { buildPackageSearchResponseMock } from './mocks/package-search-response';

describe('EpmRuleFetcher', () => {
  it.skip('retrieves the download link from the package response', async () => {
    const mockClient = httpClientMock.create();
    mockClient.getJSON.mockResolvedValueOnce(buildPackageSearchResponseMock());

    const subject = new EpmRuleFetcher({ client: mockClient });

    await subject.fetch();

    expect(mockClient.get).toHaveBeenCalledWith(
      'https://epr.elastic.co/epr/security_detection_engine/security_detection_engine-8.13.1.zip',
    );
  });
});
