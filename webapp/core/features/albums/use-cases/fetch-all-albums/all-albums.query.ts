import { Album } from "../../entities";

export type AllAlbumsQuery = () => Promise<Album[]>;
