import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SkipThrottle } from '@nestjs/throttler';
import { createReadStream, existsSync, fstat } from 'fs';
import { join, relative } from 'path';
import { LoginGuard } from 'src/login.guard';
import { ImageService } from './image.service';

@Controller('image')
@UseGuards(LoginGuard)
@SkipThrottle()
export class ImageController {
  constructor(private imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const imageId = await this.imageService.saveImage(file.buffer);
    return { id: imageId };
  }

  @Get('/:id')
  @Header('Content-Type', 'image/jpg')
  getStaticFile(@Param('id') id: string) {
    const path = join(process.cwd(), 'media', id + '.jpg');
    if (!existsSync(path))
      return new StreamableFile(
        createReadStream(join(process.cwd(), 'default_media', 'dummy.jpg')),
      );
    return new StreamableFile(createReadStream(path));
  }
}
