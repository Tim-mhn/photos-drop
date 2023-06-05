import { randomId } from "../../../../shared/utils";
import { Images } from "@shared";
import { AlbumsAPI } from "../application/albums.api";
import { Album, Albums } from "../domain";

export class MockAlbumsApi implements AlbumsAPI {
  async addPhotosToAlbum(_args: { photos: Images; album: Album }) {
    await this._wait(this.TIMEOUT);
  }
  private readonly TIMEOUT = 300;
  async getAlbum(albumId: string): Promise<Album> {
    await this._wait(this.TIMEOUT);
    const album = this.albums.find((a) => a.id === albumId);
    if (!album) throw new Error("album not found");
    return album;
  }
  async fetchAllAlbums() {
    await this._wait(this.TIMEOUT);

    return this.albums;
  }

  private async _wait(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async deleteAlbum(albumId: string) {
    await this._wait(this.TIMEOUT);

    this.albums = this.albums.filter((a) => a.id !== albumId);
  }

  async createAlbum({ name }: { name: string }) {
    await this._wait(this.TIMEOUT);

    const randomAlbum: Album = {
      id: randomId(),
      name,
      coverPhoto: this.COVER_PHOTO,
      itemsCount: 0,
    };
    this.albums = [...this.albums, randomAlbum];
  }

  async getAlbumPhotos(albumId: string): Promise<Images> {
    return new Array(30).fill("").map((_, n) => ({
      id: n.toString(),
      url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
    }));
  }

  private COVER_PHOTO =
    "https://yt3.ggpht.com/slpyze3-aTwNUKBWT0-8tPKybF3RlkieB9YnYC8YSe_J6pL2eyGVi_jvznVSeZFJiVPhvdt-7Q=s88-c-k-c0x00ffffff-no-rj-mo";
  private albums: Albums = new Array(10).fill("").map((_, index) => ({
    id: index.toString(),
    coverPhoto: this.COVER_PHOTO,
    itemsCount: 10,
    name: `Album ${index + 1}`,
  }));
}
