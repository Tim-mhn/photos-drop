export type ImageId = string;

export type Image = { url: string; id: ImageId; date: Date };
export type Images = Image[];

export type UserImagesDTO = {
  date: string;
  images: Images;
}[];
