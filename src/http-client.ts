interface IHttpClient {
  get(url: string): Promise<Response>;
  getJSON<T>(url: string): Promise<T>;
}

export class HttpClient implements IHttpClient {
  get(url: string): Promise<Response> {
    return fetch(url);
  }

  getJSON<T = unknown>(url: string): Promise<T> {
    return fetch(url).then((response) => response.json()) as Promise<T>;
  }
}
