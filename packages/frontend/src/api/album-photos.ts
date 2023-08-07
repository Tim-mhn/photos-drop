import { apiClient } from ".";
import { ALBUMS_API_ENDPOINT } from "./endpoints";

const buildAlbumPhotosEndpoint = (albumId: string) =>
  `${ALBUMS_API_ENDPOINT}/${albumId}/photos`;

export async function getAlbumPhotos(albumId: string) {
  const endpoint = buildAlbumPhotosEndpoint(albumId);
  return apiClient.get<{ url: string; id: string }[]>(endpoint);
}
