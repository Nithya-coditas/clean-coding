import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { generateUniqueFileId } from '../utility/generateUniqueFileId';
import { FileRepository } from './files.repository';
import { FILE_RESPONSE } from './files.constants';

@Injectable()
export class FileService {
  constructor(private fileRepository: FileRepository) {}
  async uploadFile(fileName: string, file: string) {
    try {
      const uniqueFileIdentifier = generateUniqueFileId(fileName);
      await this.fileRepository.uploadFile(uniqueFileIdentifier, file);
      return FILE_RESPONSE.FILE_UPLOADED;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
