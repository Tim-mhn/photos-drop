import { create } from "zustand";
import { AlbumPhotosStore } from "../domain/store";
import { Photos } from "../../photos";
import { AlbumId } from "../../albums";

type AlbumPhotoStoreState = AlbumPhotosStore & {
  albumPhotosMap: Map<AlbumId, Photos>;
};

export function buildAlbumPhotosStore(): { getState(): AlbumPhotosStore } {
  const store = create<AlbumPhotoStoreState>((set, get) => ({
    albumPhotosMap: new Map<AlbumId, Photos>(),
    getAlbumPhotos: ({ albumId }: { albumId: string }) => {
      console.group("getAlbumPhotos");
      const albumsPhotosMap = get().albumPhotosMap;
      console.log(albumsPhotosMap);
      console.groupEnd();
      return albumsPhotosMap.get(albumId) || [];
    },
    addPhotosToAlbum: ({
      albumId,
      photos,
    }: {
      albumId: string;
      photos: Photos;
    }) => {
      const currentPhotos = get().getAlbumPhotos({ albumId });
      const currentPhotosIds = currentPhotos.map((p) => p.id);
      const photosToBeAdded = photos.filter(
        (p) => !currentPhotosIds.includes(p.id)
      );
      const albumPhotos = [...currentPhotos, ...photosToBeAdded];
      const currentAlbumPhotosMap = get().albumPhotosMap;
      currentAlbumPhotosMap.set(albumId, albumPhotos);
      set({
        albumPhotosMap: currentAlbumPhotosMap,
      });
    },
  }));

  return store;
}

export const albumPhotosStore = buildAlbumPhotosStore();
