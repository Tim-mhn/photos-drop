export interface ImageRepository {
  uploadToStorage(files: Express.Multer.File[]): Promise<void>;
}
