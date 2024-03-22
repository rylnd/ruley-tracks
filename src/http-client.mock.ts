import { HttpClient } from './http-client';

const httpClientMock: jest.Mocked<HttpClient> = {
  fetch: jest.fn(),
  get: jest.fn(),
  getJSON: jest.fn(),
  getStream: jest.fn(),
};

export default {
  create: () => httpClientMock,
};
