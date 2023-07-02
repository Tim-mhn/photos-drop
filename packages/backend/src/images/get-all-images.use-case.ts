import { Inject, Injectable } from '@nestjs/common';
import { IMAGE_REPOSITORY_TOKEN } from './provider';
import { UserImagesRepository } from './image.repository';
import { Images } from '@shared';

export type UserImages = { date: Date; images: Images }[];
@Injectable()
export class GetAllImagesUseCase {
  constructor(
    @Inject(IMAGE_REPOSITORY_TOKEN) private imageRepo: UserImagesRepository,
  ) {}

  async getImagesOfUserGroupedByDate(userId: string): Promise<UserImages> {
    const allImages = await this.imageRepo.getImagesOfUser(userId);
    return groupImagesByDay(allImages);
  }
}

function getDateOfYear(date: Date) {
  return date.toISOString().slice(0, 10);
}
export function groupImagesByDay(images: Images) {
  const obj = images.reduce((result, img) => {
    const date = getDateOfYear(img.date); // Extracting the date in YYYY-MM-DD format
    if (!result[date]) {
      result[date] = [];
    }
    result[date].push(img);
    return result;
  }, {} as Record<string, Images>);

  return Object.keys(obj)
    .sort(sortDatesByMostRecentFirst)
    .map((dateString) => ({
      date: new Date(dateString),
      images: obj[dateString],
    }));
}

function sortDatesByMostRecentFirst(d1: string, d2: string) {
  return d2.localeCompare(d1);
}
