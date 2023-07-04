import { ImageId, Images } from '@shared';

type ImageUrl = string;
type ImageInput = {
  url: ImageUrl;
  date: Date;
};
export interface UserImagesRepository {
  getImagesOfUser(userId?: string): Promise<Images>;
  saveImagesOfUser(userId: string, images: ImageInput[]): Promise<void>;
  getImageUrls?(photoIds: ImageId[]): Promise<string[]>;
}

export type FileUrl = string;

export interface UploadRepository {
  uploadToStorage(files: Express.Multer.File[]): Promise<FileUrl[]>;
}
