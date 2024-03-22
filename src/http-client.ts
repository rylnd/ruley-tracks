import { ReadableStream } from 'stream/web';

type Fetch = typeof fetch;

interface IHttpClient {
  get(url: string): Promise<Response>;
  getJSON<T>(url: string): Promise<T>;
  getStream<T>(url: string): Promise<ReadableStream<T>>;
}

export class HttpClient implements IHttpClient {
  private fetch: Fetch;

  constructor(fetch: Fetch = global.fetch) {
    this.fetch = fetch;
  }

  get(url: string): Promise<Response> {
    return this.fetch(url);
  }

  getJSON<T = unknown>(url: string): Promise<T> {
    return this.fetch(url).then((response) => response.json()) as Promise<T>;
  }

  async getStream<T = unknown>(url: string): Promise<ReadableStream<T>> {
    const response = await this.fetch(url);
    return response.body as ReadableStream<T>;
  }
}
