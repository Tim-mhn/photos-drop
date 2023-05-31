export type AlbumId = string;
export type AlbumName = string;
export type Album = {
  id: AlbumId;

  name: AlbumName;
  itemsCount: number;
  coverPhoto: string;
};

export type Albums = Album[];
