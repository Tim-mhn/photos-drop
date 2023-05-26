export type CreateAlbumInput = {
  name: string;
};

export type CreateAlbumCommand = (input: CreateAlbumInput) => Promise<void>;
