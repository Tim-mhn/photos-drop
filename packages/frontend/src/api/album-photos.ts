import { apiClient } from ".";
import { Image } from "../../../shared/src";
import { AddPhotosToAlbumDTO } from "../../../shared/src/dtos";
import { IAlbum } from "../../../shared/src/models";
import { ALBUMS_API_ENDPOINT } from "./endpoints";

const buildAlbumPhotosEndpoint = (albumId: string) =>
  `${ALBUMS_API_ENDPOINT}/${albumId}/photos`;

export async function getAlbumPhotos(albumId: string) {
  const endpoint = buildAlbumPhotosEndpoint(albumId);
  return apiClient.get<{ url: string; id: string }[]>(endpoint);
}

export async function addPhotosToAlbum({
  album,
  photos,
}: {
  album: IAlbum;
  photos: Image[];
}) {
  const endpoint = `${buildAlbumPhotosEndpoint(<string>album.id)}/add`;
  const photosIds = photos.map((p) => p.id);
  return apiClient.post<AddPhotosToAlbumDTO, void>(endpoint, { photosIds });
}
