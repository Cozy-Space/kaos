import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readdir, readdirSync, writeFileSync } from 'fs';
import { nanoid } from 'nanoid';
import { join, relative } from 'path';
import { ContainerService } from 'src/container/container.service';

@Injectable()
export class ImageService {
  private imagePath: string;

  constructor() {
    this.imagePath = join('/', relative('/', '.'), 'media');
    this.ensureImageDir();
  }

  ensureImageDir() {
    if (!existsSync(this.imagePath)) mkdirSync(this.imagePath);
  }

  async saveImage(image: Buffer): Promise<string> {
    const fileName = nanoid();
    writeFileSync(join(this.imagePath, fileName + '.jpg'), image);
    return fileName;
  }
}
