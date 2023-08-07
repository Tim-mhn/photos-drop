import { Image, ImageId } from '@shared';

type ImageUrl = string;
type ImageInput = {
  url: ImageUrl;
  date: Date;
};
export interface UserImagesRepository {
  getImagesOfUser(userId?: string): Promise<Omit<Image, 'url'>[]>;
  saveImagesOfUser(userId: string, images: ImageInput[]): Promise<void>;
  getImageUrls?(photoIds: ImageId[]): Promise<string[]>;
}

export type FileUrl = string;

export interface ImagesRepository {
  uploadToStorage(files: Express.Multer.File[]): Promise<FileUrl[]>;
  getImagesUrls(photosIds: ImageId[]): Promise<string[]>;
}
