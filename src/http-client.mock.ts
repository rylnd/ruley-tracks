import { HttpClient } from './http-client';

const httpClientMock: jest.Mocked<HttpClient> = {
  get: jest.fn(),
  getJSON: jest.fn(),
};

export default {
  create: () => httpClientMock,
};
