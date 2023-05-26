import { Album } from "../../domain";

export type AllAlbumsQuery = () => Promise<Album[]>;
