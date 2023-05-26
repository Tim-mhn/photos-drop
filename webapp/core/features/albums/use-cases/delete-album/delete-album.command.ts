import { AlbumId } from "../../domain";

export type DeleteAlbumCommand = (albumId: AlbumId) => Promise<void>;
