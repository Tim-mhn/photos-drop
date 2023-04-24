import { Album } from "../../entities";
import { useAlbumsStore } from "../../infrastructure";

export function getAlbums(): Album[] {
  return useAlbumsStore.getState().albums;
}
