import { create } from "zustand";
import { Album } from "./album";
import { randomId } from "../../shared/utils";

const initialAlbums: Album[] = new Array(14).fill("").map((_, n) => ({
  name: "Interrail 2023",
  itemsCount: 300,
  coverPhoto: `https://picsum.photos/id/${n + 1}/250/250`,
  id: randomId(),
}));

export const useAlbumsStore = create(() => ({
  albums: initialAlbums,
}));
