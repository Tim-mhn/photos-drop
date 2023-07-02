import { UserImagesRepository } from './image.repository';
import { Image } from '@shared';
import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';

const USER_IMAGES_FILE = path.join(process.cwd(), 'user-images.json');
export class FileSystemUserImagesRepository implements UserImagesRepository {
  async saveImagesOfUser(userId: string, imageUrls: any[]) {
    const allImagesMap = await readJSONFile<Record<string, string[]>>(
      USER_IMAGES_FILE,
    );
    const userImages = allImagesMap[userId];
    allImagesMap[userId] = userImages
      ? [...userImages, ...imageUrls]
      : [...imageUrls];
    await this.writeFile(USER_IMAGES_FILE, allImagesMap);
  }

  writeFile<I = any>(filename: string, data: I) {
    return writeFile(filename, JSON.stringify(data));
  }

  async getImagesOfUser(userId: string): Promise<(Image & { date: Date })[]> {
    const allImagesMap = await readJSONFile<
      Record<string, ReplaceDateByString<Image>[]>
    >(USER_IMAGES_FILE);

    const images = allImagesMap[userId] || [];

    return images.map((img) => ({
      url: img.url,
      date: img.date ? new Date(img.date) : new Date(Date.now()),
      id: img.url,
    }));
  }
}

async function readJSONFile<O = any>(filename: string) {
  const data = await readFile(filename, {
    encoding: 'utf-8',
  });

  return JSON.parse(data) as O;
}

type ReplaceDateByString<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};
