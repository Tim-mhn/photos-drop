import { Images } from '@shared';

type ImageUrl = string;
type ImageInput = {
  url: ImageUrl;
  date: Date;
};
export interface UserImagesRepository {
  getImagesOfUser(userId?: string): Promise<Images>;
  saveImagesOfUser(userId: string, images: ImageInput[]);
}

export type FileUrl = string;

export interface UploadRepository {
  uploadToStorage(files: Express.Multer.File[]): Promise<FileUrl[]>;
}
