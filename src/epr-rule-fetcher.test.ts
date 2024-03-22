import { EprRuleFetcher } from './epr-rule-fetcher';
import httpClientMock from './http-client.mock';
import { buildPackageSearchResponseMock } from './mocks/package-search-response';
import { createZipReadableStreamMock } from './mocks/mock-zip-stream';

describe('EprRuleFetcher', () => {
  describe('#fetch()', () => {
    let mockClient: ReturnType<typeof httpClientMock.create>;

    beforeEach(() => {
      mockClient = httpClientMock.create();
      // search response
      mockClient.getJSON.mockResolvedValueOnce([buildPackageSearchResponseMock()]);

      // package stream response
      mockClient.getStream.mockResolvedValueOnce(createZipReadableStreamMock());
    });

    it('retrieves the package JSON from the EPR search API', async () => {
      const subject = new EprRuleFetcher({ client: mockClient });

      await subject.fetch();

      expect(mockClient.getJSON).toHaveBeenCalledWith(
        'https://epr.elastic.co/search?package=security_detection_engine',
      );
    });

    it('downloads the package contents from the URL specified in the package', async () => {
      const subject = new EprRuleFetcher({ client: mockClient });

      await subject.fetch();

      expect(mockClient.getStream).toHaveBeenCalledWith(
        'https://epr.elastic.co/epr/security_detection_engine/security_detection_engine-8.13.1.zip',
      );
    });
  });
});
