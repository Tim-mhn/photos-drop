import { albumPhotosStore } from "../infrastructure";

export function getAlbumPhotos({ albumId }: { albumId: string }) {
  return albumPhotosStore.getState().getAlbumPhotos({ albumId });
}
