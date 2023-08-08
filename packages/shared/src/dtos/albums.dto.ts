export type AlbumDTO = {
  id: string;
  creationDate: string;
  name: string;
  photosCount: number;
};
export type AlbumListDTO = AlbumDTO[];

export type CreateAlbumDTO = {
  name: string;
};
