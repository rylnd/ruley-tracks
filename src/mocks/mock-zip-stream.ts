import { join } from 'path';
import { Readable } from 'stream';
import { createReadStream } from 'fs';

const mockZipPath = join(__dirname, '../../test/fixtures/security_detection_engine-8.13.1.zip');

const createZipStreamMock = () => createReadStream(mockZipPath);
const createZipReadableStreamMock = () => Readable.toWeb(createZipStreamMock());

export { createZipStreamMock, createZipReadableStreamMock };
