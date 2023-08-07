import { Inject, Injectable } from '@nestjs/common';
import { ImageId, ImageWithoutUrl, Images } from '../../../shared/src';
import { UPLOAD_REPOSITORY_TOKEN } from './provider';
import { ImagesRepository } from './image.repository';
import { zipMap } from '../common/arrays';

@Injectable()
export class ImagesService {
  constructor(
    @Inject(UPLOAD_REPOSITORY_TOKEN) private imagesRepo: ImagesRepository,
  ) {}

  async buildImagesWithUrls(imagesWithoutUrls: ImageWithoutUrl[]) {
    console.log(this.imagesRepo);
    const imagesIds = imagesWithoutUrls.map((img) => img.id);
    const imagesUrls = await this.imagesRepo.getImagesUrls(imagesIds);

    const images: Images = zipMap(
      imagesWithoutUrls,
      imagesUrls,
      (img, url) => ({
        ...img,
        url,
      }),
    );

    return images;
  }

  async getImagesUrlsFromIds(imagesIds: ImageId[]) {
    return this.imagesRepo.getImagesUrls(imagesIds);
  }
}
