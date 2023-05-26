import { Photos } from "../../photos";

export interface AlbumPhotosStore {
  getAlbumPhotos(props: { albumId: string }): Photos;
  addPhotosToAlbum(props: { albumId: string; photos: Photos }): void;
}
