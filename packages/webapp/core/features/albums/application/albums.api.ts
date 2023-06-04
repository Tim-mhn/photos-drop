import { Photos } from "../../photos";
import { Album, AlbumId, AlbumName, Albums } from "../domain";

export type AddPhotosToAlbumInput = {
  photos: Photos;
  album: Album;
};
export interface AlbumsAPI {
  createAlbum: ({ name }: { name: AlbumName }) => Promise<void>;
  fetchAllAlbums: () => Promise<Albums>;
  deleteAlbum: (albumId: string) => Promise<void>;
  getAlbum: (albumId: AlbumId) => Promise<Album>;
  getAlbumPhotos: (albumId: AlbumId) => Promise<Photos>;
  addPhotosToAlbum: ({ photos, album }: AddPhotosToAlbumInput) => Promise<void>;
}
