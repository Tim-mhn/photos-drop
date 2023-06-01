import { Album, AlbumId, AlbumName, Albums } from "../domain";

export interface AlbumsAPI {
  createAlbum: ({ name }: { name: AlbumName }) => Promise<void>;
  fetchAllAlbums: () => Promise<Albums>;
  deleteAlbum: (albumId: string) => Promise<void>;
  getAlbum: (albumId: AlbumId) => Promise<Album>;
}
