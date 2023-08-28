import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/fileUpload.dto';
import { FileService } from './files.service';

@Controller('files')
export class FileController {
  constructor(private fileService: FileService) {}

  @Post('template')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSesMailTemplate(
    @UploadedFile() file,
    @Body() FileUploadDto: FileUploadDto,
  ) {
    try {
      return await this.fileService.uploadFile(
        FileUploadDto.fileName,
        file.buffer.toString(),
      );
    } catch (error) {
      throw error;
    }
  }
}
