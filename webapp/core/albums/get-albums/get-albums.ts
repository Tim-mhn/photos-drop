import { Album } from "../album";
import { useAlbumsStore } from "../store";

export function getAlbums(): Album[] {
  return useAlbumsStore.getState().albums;
}
