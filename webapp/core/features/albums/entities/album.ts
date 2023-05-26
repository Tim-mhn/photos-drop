export type AlbumId = string;
export type Album = {
  name: string;
  itemsCount: number;
  coverPhoto: string;
  id: AlbumId;
};

export type Albums = Album[];
