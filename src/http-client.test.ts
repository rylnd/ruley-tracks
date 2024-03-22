import { ReadableStream } from 'stream/web';
import { HttpClient } from './http-client';
import { createZipReadableStreamMock } from './mocks/mock-zip-stream';

describe('HttpClient', () => {
  let fetch: jest.MockedFunction<typeof global.fetch>;
  let client: HttpClient;

  beforeEach(() => {
    fetch = jest.fn();
    client = new HttpClient(fetch);
  });

  describe('get()', () => {
    beforeEach(() => {
      fetch.mockResolvedValueOnce({ body: 'bar' } as unknown as Response);
    });

    it('calls fetch with the given URL', async () => {
      client.get('https://example.com');

      expect(fetch).toHaveBeenCalledWith('https://example.com');
    });

    it('returns the received response', async () => {
      const response = await client.get('https://example.com');

      expect(response).toEqual({ body: 'bar' });
    });
  });

  describe('getJSON()', () => {
    beforeEach(() => {
      const mockJsonResponse = { json: jest.fn().mockResolvedValue({ foo: 'bar' }) };
      fetch.mockResolvedValueOnce(mockJsonResponse as unknown as Response);
    });

    it('calls fetch with the given URL', async () => {
      await client.getJSON('https://example.com');

      expect(fetch).toHaveBeenCalledWith('https://example.com');
    });

    it('returns the received response as JSON', async () => {
      const response = await client.getJSON('https://example.com');

      expect(response).toEqual({ foo: 'bar' });
    });
  });

  describe('getStream()', () => {
    beforeEach(() => {
      const mockStreamResponse = { body: createZipReadableStreamMock() };
      fetch.mockResolvedValueOnce(mockStreamResponse as unknown as Response);
    });

    it('calls fetch with the given URL', async () => {
      await client.getStream('https://example.com');

      expect(fetch).toHaveBeenCalledWith('https://example.com');
    });

    it('returns the received response as JSON', async () => {
      const response = await client.getStream('https://example.com');

      expect(response).toBeInstanceOf(ReadableStream);
    });
  });
});
