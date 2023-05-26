import { create } from "zustand";
import { Album } from "../entities/album";
import { randomId } from "../../../../shared/utils";
import { Photos } from "../../photos";
import { albumPhotosStore, buildAlbumPhotosStore } from "../../album-photos";
const initialAlbums: Album[] = new Array(14).fill("").map((_, n) => ({
  name: "Interrail 2023",
  itemsCount: 300,
  coverPhoto: `https://picsum.photos/id/${n + 1}/250/250`,
  id: randomId(),
}));

export type AlbumsStore = ReturnType<typeof buildAlbumsStore>;

export type AlbumsStoreState = {
  albums: Album[];
  getAlbumById: (id: string) => Album;
  createAlbum: (name: string, initialPhotos?: { photos: Photos }) => void;
};

export function buildAlbumsStore({
  initialAlbums,
  albumPhotosStore,
}: {
  initialAlbums: Album[];
  albumPhotosStore: ReturnType<typeof buildAlbumPhotosStore>;
}) {
  return create<AlbumsStoreState>((set, get) => ({
    albums: initialAlbums,
    getAlbumById: (id: string) => {
      const allAlbums = get().albums;
      return getAlbumById({ albums: allAlbums, id });
    },
    createAlbum: (
      name: string,
      initialPhotos: { photos: Photos } = { photos: [] }
    ) => {
      const { photos } = initialPhotos;
      const currentAlbums = get().albums;

      const newAlbum: Album = {
        name,
        id: randomId(),
        coverPhoto: `https://picsum.photos/id/${
          currentAlbums.length + 1
        }/250/250`,
        itemsCount: photos?.length,
      };
      set({
        albums: [...currentAlbums, newAlbum],
      });

      albumPhotosStore.getState().addPhotosToAlbum({
        albumId: newAlbum.id,
        photos,
      });
    },
  }));
}

function getAlbumById({ albums, id }: { albums: Album[]; id: string }): Album {
  const album = albums.find((a) => a.id === id);

  if (!album) throw new Error(`Could not find album ${id}`);

  return album;
}
export const useAlbumsStore = buildAlbumsStore({
  initialAlbums,
  albumPhotosStore: albumPhotosStore,
});
