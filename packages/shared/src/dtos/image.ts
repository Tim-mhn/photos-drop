export type Image = { url: string; id: string; date: Date };
export type Images = Image[];

export type UserImagesDTO = {
  date: string;
  images: Images;
}[];
