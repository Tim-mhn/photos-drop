import { CreateAlbumCommand } from "../use-cases/create-album/create-album.command";
import { DeleteAlbumCommand } from "../use-cases/delete-album/delete-album.command";
import { AllAlbumsQuery } from "../use-cases/fetch-all-albums/all-albums.query";

export interface AlbumsAPI {
  createAlbum: CreateAlbumCommand;
  fetchAllAlbums: AllAlbumsQuery;
  deleteAlbum: DeleteAlbumCommand;
}
