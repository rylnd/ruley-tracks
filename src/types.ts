export type Rule = {
  name: string;
  type: string;
};

export interface IRuleFetcher {
  fetch: () => Promise<Rule[]>;
}

export interface PackageResponse {
  download: string;
}
