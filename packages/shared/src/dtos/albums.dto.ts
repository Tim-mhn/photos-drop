export type AlbumDTO = {
  id: string;
  creationDate: string;
  name: string;
};
export type AlbumListDTO = AlbumDTO[];

export type CreateAlbumDTO = {
  name: string;
};
