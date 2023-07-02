import { Inject, Injectable, Optional } from '@nestjs/common';
import { IMAGE_REPOSITORY_TOKEN, UPLOAD_REPOSITORY_TOKEN } from './provider';
import { UserImagesRepository, UploadRepository } from './image.repository';
import { getImageDate } from './get-image-date';

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
export class UploadFilesUsecase {
  private readonly SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png'];
  constructor(
    @Inject(IMAGE_REPOSITORY_TOKEN) private imageRepo: UserImagesRepository,
    @Inject(UPLOAD_REPOSITORY_TOKEN) private uploadRepo: UploadRepository,
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

function zipMap<T, U, V>(
  arr1: T[],
  arr2: U[],
  callbackFn: (t: T, u: U) => V,
): V[] {
  if (arr1.length !== arr2.length)
    throw new Error(
      `[zip error]: arrays do not have the same length (${arr1.length} != ${arr2.length}`,
    );

  return arr1.map((t, index) => {
    const u = arr2[index];
    return callbackFn(t, u);
  });
}
