import { create } from "zustand";
import { Album } from "./album";
import { randomId } from "../../shared/utils";

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
};

export function buildAlbumsStore({
  initialAlbums,
}: {
  initialAlbums: Album[];
}) {
  return create<AlbumsStoreState>((_, get) => ({
    albums: initialAlbums,
    getAlbumById: (id: string) => {
      const allAlbums = get().albums;
      return getAlbumById({ albums: allAlbums, id });
    },
  }));
}

function getAlbumById({ albums, id }: { albums: Album[]; id: string }): Album {
  const album = albums.find((a) => a.id === id);

  if (!album) throw new Error(`Could not find album ${id}`);

  return album;
}
export const useAlbumsStore = buildAlbumsStore({ initialAlbums });
