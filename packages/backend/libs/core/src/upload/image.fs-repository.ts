import { createWriteStream } from 'fs';
import { ImageRepository } from './image.repository';

const IMAGES_FOLDER_PATH = `${process.cwd()}/images/`;

const randomId = () => (Math.random() + 1).toString(36).substring(2);
export class FileSystemImageRepository implements ImageRepository {
  async uploadToStorage(files: Express.Multer.File[]): Promise<void> {
    const uploadFilesPromises = files.map((f) =>
      this._uploadOneFileToStorage(f),
    );

    await Promise.all(uploadFilesPromises);
  }

  private _uploadOneFileToStorage(f: Express.Multer.File) {
    return new Promise<void>((resolve, reject) => {
      const fileExtension = f.originalname.split('.')[1];
      const filepath = `${IMAGES_FOLDER_PATH}${randomId()}.${fileExtension}`;
      const ws = createWriteStream(filepath);
      ws.write(f.buffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}
