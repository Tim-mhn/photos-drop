import { Inject, Injectable } from '@nestjs/common';
import { UserImagesRepository } from './image.repository';
import axios from 'axios';
import * as AdmZip from 'adm-zip';
import { USER_IMAGES_REPOSITORY_TOKEN } from './provider';

@Injectable()
export class DownloadPhotosUseCase {
  constructor(
    @Inject(USER_IMAGES_REPOSITORY_TOKEN)
    private userImagesRepository: UserImagesRepository,
  ) {}

  async execute(
    photoIds: string[],
  ): Promise<{ buffer: Buffer; filename: string; filetype: string }> {
    if (photoIds.length === 0)
      throw new Error('empty list of photos to be downloaded');
    const photoUrls = await this.userImagesRepository.getImageUrls(photoIds);

    const photoBuffers = await this._getPhotoBuffersFromUrls({
      urls: photoUrls,
    });

    if (photoBuffers.length === 1) {
      const singleBuffer = photoBuffers[0].buffer;

      /**
       * 'file-type' package is only exposed as ESM and Nestjs compiles everything as CommonJS
       * this is one of the solutions to use ES-only modules in a CommonJS build
       */
      const fileTypeFromBuffer = await eval(`import('file-type')`);

      const filetype = (await fileTypeFromBuffer.fileTypeFromBuffer(
        singleBuffer,
      )) || { ext: 'jpg' };

      return {
        buffer: photoBuffers[0],
        filename: `image.${filetype.ext}`,
        filetype: `application/${filetype.ext}`,
      };
    }

    return {
      buffer: this._buildZipFile({ photoBuffers, photoIds }),
      filename: 'uploads.zip',
      filetype: 'application/zip',
    };
  }

  private async _getPhotoBuffersFromUrls({ urls }: { urls: string[] }) {
    return await Promise.all(
      urls.map(async (url) => {
        const res = await axios.get<ArrayBuffer>(url, {
          responseType: 'arraybuffer',
        });

        return Buffer.from(res.data);
      }),
    );
  }

  private _buildZipFile({
    photoBuffers,
    photoIds,
  }: {
    photoBuffers: Buffer[];
    photoIds: string[];
  }) {
    const zip = new AdmZip();

    photoBuffers.forEach((b, index) => {
      const id = photoIds[index];
      try {
        zip.addFile(id, b);
      } catch (err) {
        console.error(err);
      }
    });

    return zip.toBuffer();
  }
}
