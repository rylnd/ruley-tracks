import { existsSync } from 'fs';
import { mkdir } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';

export class FileManager {
  private directoryPath: string | undefined;
  private baseDirectoryPath: string;
  private folderName: string;

  constructor(baseDirectory?: string, folderName?: string) {
    this.baseDirectoryPath = baseDirectory ?? tmpdir();
    this.folderName = folderName ?? 'ruley-tracks';
  }

  public async getUnzipPath(): Promise<string> {
    const tempDir = await this.getTempDir();
    const destinationPath = join(tempDir, 'rules');

    if (!existsSync(destinationPath)) {
      await mkdir(destinationPath);
    }

    return destinationPath;
  }

  public async getZipPath(): Promise<string> {
    const tempDir = await this.getTempDir();
    const destinationPath = join(tempDir, 'rules.zip');

    return destinationPath;
  }

  private async getTempDir(): Promise<string> {
    if (!this.directoryPath) {
      this.directoryPath = await this.buildDirectory();
    }

    return this.directoryPath;
  }

  private async buildDirectory(): Promise<string> {
    const directoryPath = join(this.baseDirectoryPath, this.folderName);

    if (!existsSync(directoryPath)) {
      await mkdir(directoryPath);
    }

    return directoryPath;
  }
}
