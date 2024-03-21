export type Rule = {
  id: string;
  name: string;
  type: string;
  version: number;
};

export interface IRuleFetcher {
  fetch: () => Promise<Rule[]>;
}

export interface PackageResponse {
  download: string;
}
