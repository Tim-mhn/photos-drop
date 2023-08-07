import { apiClient } from ".";
import { ALBUMS_API_ENDPOINT } from "./endpoints";
import { AlbumListDTO, CreateAlbumDTO } from "../../../shared/src/dtos";
import { IAlbum } from "../../../shared/src/models";

export async function createAlbum(data: CreateAlbumDTO) {
  return apiClient.post<CreateAlbumDTO, void>(ALBUMS_API_ENDPOINT, data);
}

export async function getUserAlbums(): Promise<IAlbum[]> {
  const albumListDTO = await apiClient.get<AlbumListDTO>(ALBUMS_API_ENDPOINT);
  return albumListDTO.map(({ creationDate, id, name }) => ({
    id,
    name,
    creationDate: new Date(creationDate),
  }));
}
