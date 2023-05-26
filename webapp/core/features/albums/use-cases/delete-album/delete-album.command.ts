import { AlbumId } from "../../entities";

export type DeleteAlbumCommand = (albumId: AlbumId) => Promise<void>;
