import { HttpClient } from './http-client';

const httpClientMock = {
  get: jest.fn(),
  getJSON: jest.fn(),
  getStream: jest.fn(),
} as unknown as jest.Mocked<HttpClient>;

export default {
  create: () => httpClientMock,
};
