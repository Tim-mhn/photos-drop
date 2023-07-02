import { createWriteStream } from 'fs';
import { FileUrl, UploadRepository } from './image.repository';

const IMAGES_FOLDER_PATH = `${process.cwd()}/images/`;

export class FileSystemUploadRepository implements UploadRepository {
  async uploadToStorage(files: Express.Multer.File[]): Promise<FileUrl[]> {
    const uploadFilesPromises = files.map((f) =>
      this._uploadOneFileToStorage(f),
    );

    return Promise.all(uploadFilesPromises);
  }

  private _uploadOneFileToStorage(f: Express.Multer.File) {
    return new Promise<FileUrl>((resolve, reject) => {
      const fileExtension = f.originalname.split('.')[1];
      const filename = `${randomId()}.${fileExtension}`;
      const filepath = `${IMAGES_FOLDER_PATH}${filename}`;
      const ws = createWriteStream(filepath);
      ws.write(f.buffer, (err) => {
        if (err) reject(err);
        else resolve(`http://localhost:8000/${filename}`);
      });
    });
  }
}

const randomId = () => (Math.random() + 1).toString(36).substring(2);
