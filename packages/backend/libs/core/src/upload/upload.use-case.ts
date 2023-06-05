import { Inject, Injectable } from '@nestjs/common';
import { IMAGE_REPOSITORY_TOKEN } from './provider';
import { ImageRepository } from './image.repository';

@Injectable()
export class UploadFilesUsecase {
  private readonly SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png'];
  constructor(
    @Inject(IMAGE_REPOSITORY_TOKEN) private imageRepo: ImageRepository,
  ) {}

  async uploadFiles(files: Express.Multer.File[]) {
    this._checkAllFilesAreSupported(files);
    await this.imageRepo.uploadToStorage(files);
  }

  private _checkAllFilesAreSupported(files: Express.Multer.File[]) {
    const mimetypeList = files.map((f) => f.mimetype);

    if (mimetypeList.some((mimetype) => this._mimeTypeIsNotSupported(mimetype)))
      throw new Error(`Not all file types are supported`);
  }

  private _mimeTypeIsNotSupported(mimetype: string) {
    return !this.SUPPORTED_MIME_TYPES.includes(mimetype);
  }
}
