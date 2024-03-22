import AdmZip from 'adm-zip';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';
import { basename, extname, join } from 'path';

import { EPR_RULE_URL } from './constants';
import type { HttpClient } from './http-client';
import { PackageResponse, IRuleFetcher, Rule } from './types';
import { FileManager } from './file-manager';
import { readRules } from './rule-reader';

const getEprRulesPath = (eprPackagePath: string): string => join(eprPackagePath, 'kibana', 'security_rule');

const getEprPackageFolderName = (downloadPath: string): string => basename(downloadPath, extname(downloadPath));

export class EprRuleFetcher implements IRuleFetcher {
  private url: string;
  private client: HttpClient;
  private fileManager: FileManager;

  constructor({ url, client }: { url?: string; client: HttpClient }) {
    this.client = client;
    this.url = url || EPR_RULE_URL;
    this.fileManager = new FileManager();
  }

  async fetch() {
    // get download from search
    const packageResponse = await this.client.getJSON<PackageResponse[]>(this.url);
    const downloadPath = packageResponse[0]?.download;
    if (!downloadPath) {
      throw new Error(`No downloadable package found at ${this.url}`);
    }

    // download zip
    const downloadUrl = new URL(downloadPath, this.url).toString();
    const downloadResponse = await this.client.getStream(downloadUrl);
    if (!downloadResponse) {
      throw new Error(`No package file found at ${downloadUrl}`);
    }

    // write zip to disk
    const zipPath = join(await this.fileManager.getDirectory(), 'rules.zip');
    const zipWriteStream = createWriteStream(zipPath, { flags: 'w' });
    await finished(Readable.fromWeb(downloadResponse).pipe(zipWriteStream));

    // unzip rules
    const unzipPath = await this.fileManager.getOrMakeFolder('rules');
    new AdmZip(zipPath).extractAllTo(unzipPath, true);

    // read rules
    const packageFolderName = getEprPackageFolderName(downloadPath);
    const packagePath = join(unzipPath, packageFolderName);
    const rulesPath = getEprRulesPath(packagePath);
    const allRules = await readRules(rulesPath);

    // filter to latest rules
    const latestRulesById = allRules.reduce<Record<string, Rule>>((acc, rule) => {
      const { id, version } = rule;
      const [actualId, parsedVersion] = id.split('_');

      if (String(version) === parsedVersion && actualId != null) {
        const currentRule = acc[actualId];
        if (currentRule == null || currentRule.version < version) {
          acc[actualId] = rule;
        }
        return acc;
      } else {
        throw new Error(`Version mismatch for rule ${id}: ${version} !== ${parsedVersion}`);
      }
    }, {});
    const latestRules = Object.values(latestRulesById);

    return latestRules;
  }
}
