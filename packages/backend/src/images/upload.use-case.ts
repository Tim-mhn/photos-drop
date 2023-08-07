import { Inject, Injectable, Optional } from '@nestjs/common';
import {
  USER_IMAGES_REPOSITORY_TOKEN,
  UPLOAD_REPOSITORY_TOKEN,
} from './provider';
import { UserImagesRepository, ImagesRepository } from './image.repository';
import { getImageDate } from './get-image-date';
import { zipMap } from '../common/arrays';

export class InvalidUploadedFilesType extends Error {
  public readonly invalidTypes: string[];
  public readonly supportedTypes: string[];

  constructor({
    invalidTypes,
    supportedTypes,
  }: {
    invalidTypes: string[];
    supportedTypes: string[];
  }) {
    super();
    this.invalidTypes = invalidTypes;
    this.supportedTypes = supportedTypes;
  }
}

export type GetImageDateFn = (f: Buffer) => Promise<Date>;

@Injectable()
export class UploadFilesUseCase {
  private readonly SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png'];
  constructor(
    @Inject(USER_IMAGES_REPOSITORY_TOKEN)
    private imageRepo: UserImagesRepository,
    @Inject(UPLOAD_REPOSITORY_TOKEN) private uploadRepo: ImagesRepository,
    @Optional() private getImageDateFn: GetImageDateFn = getImageDate,
  ) {}

  async uploadFiles(userId: string, files: Express.Multer.File[]) {
    this._checkAllFilesAreSupported(files);
    const urls = await this.uploadRepo.uploadToStorage(files);
    const imageDates = await Promise.all(
      files.map((f) => this.getImageDateFn(f.buffer)),
    );
    const images = zipMap(urls, imageDates, (url, date) => ({ url, date }));
    await this.imageRepo.saveImagesOfUser(userId, images);
  }

  private _checkAllFilesAreSupported(files: Express.Multer.File[]) {
    const mimetypeList = files.map((f) => f.mimetype);

    const invalidTypes = mimetypeList.filter((type) =>
      this._mimeTypeIsNotSupported(type),
    );
    if (invalidTypes?.length > 0) {
      const uniqueInvalidTypes = Array.from(new Set(invalidTypes));
      throw new InvalidUploadedFilesType({
        invalidTypes: uniqueInvalidTypes,
        supportedTypes: this.SUPPORTED_MIME_TYPES,
      });
    }
  }

  private _mimeTypeIsNotSupported(mimetype: string) {
    return !this.SUPPORTED_MIME_TYPES.includes(mimetype);
  }
}
