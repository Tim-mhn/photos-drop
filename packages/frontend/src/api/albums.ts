import { apiClient } from ".";
import { ALBUMS_API_ENDPOINT } from "./endpoints";
import {
  AlbumDTO,
  AlbumListDTO,
  CreateAlbumDTO,
} from "../../../shared/src/dtos";
import { IAlbum } from "../../../shared/src/models";

export async function createAlbum(data: CreateAlbumDTO) {
  return apiClient.post<CreateAlbumDTO, void>(ALBUMS_API_ENDPOINT, data);
}

function mapDtoToAlbum(dto: AlbumDTO): IAlbum {
  const { creationDate, id, name, photosCount } = dto;
  return {
    id,
    name,
    creationDate: new Date(creationDate),
    photosCount,
  };
}
export async function getUserAlbums(): Promise<IAlbum[]> {
  const albumListDTO = await apiClient.get<AlbumListDTO>(ALBUMS_API_ENDPOINT);
  return albumListDTO.map(mapDtoToAlbum);
}

export async function getAlbumById(albumId: string): Promise<IAlbum> {
  const endpoint = `${ALBUMS_API_ENDPOINT}/${albumId}`;
  const dto = await apiClient.get<AlbumDTO>(endpoint);
  return mapDtoToAlbum(dto);
}
