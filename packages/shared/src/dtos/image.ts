import { ReplaceDateByString } from "../../../backend/src/types/replace-date";

export type ImageId = string;

export type Image = { url: string; id: ImageId; date: Date };
export type Images = Image[];

export type UserImages = {
  date: Date;
  images: Images;
}[];

export type UserImagesDTO = ReplaceDateByString<UserImages[number]>[];
