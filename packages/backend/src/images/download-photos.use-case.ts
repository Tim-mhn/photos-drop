import { Inject, Injectable } from '@nestjs/common';
import { UserImagesRepository } from './image.repository';
import axios from 'axios';
import * as AdmZip from 'adm-zip';
import { IMAGE_REPOSITORY_TOKEN } from './provider';

@Injectable()
export class DownloadPhotosUseCase {
  constructor(
    @Inject(IMAGE_REPOSITORY_TOKEN)
    private userImagesRepository: UserImagesRepository,
  ) {}

  async execute(photoIds: string[]): Promise<Buffer> {
    if (photoIds.length === 0)
      throw new Error('empty list of photos to be downloaded');
    const photoUrls = await this.userImagesRepository.getImageUrls(photoIds);

    const photoBuffers = await this._getPhotoBuffersFromUrls({
      urls: photoUrls,
    });

    if (photoBuffers.length === 1) return photoBuffers[0];

    return this._buildZipFile({ photoBuffers, photoIds });
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
