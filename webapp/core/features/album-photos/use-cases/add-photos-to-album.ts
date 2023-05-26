import { Photos } from "../../photos";
import { Album } from "../../albums/domain/album";
import { albumPhotosStore } from "../infrastructure/store";

export function addPhotosToAlbum({
  photos,
  album,
}: {
  photos: Photos;
  album: Album;
}) {
  return albumPhotosStore
    .getState()
    .addPhotosToAlbum({ photos, albumId: album.id });
}
