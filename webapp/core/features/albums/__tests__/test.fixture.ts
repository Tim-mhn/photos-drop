import { Store, createTestStore } from "../../../store";
import { albumsSelectors } from "../albumsSlice";
import { AlbumId, Albums } from "../domain";
import { deleteAlbum } from "../use-cases/delete-album/delete-album";
import { fetchAllAlbums } from "../use-cases/fetch-all-albums/fetch-all-albums";
import { createAlbum } from "../use-cases/create-album/create-album";
import { albumBuilder } from "./album.builder";
import { AlbumsAPI } from "../application/albums.api";
import { Photos } from "../../photos";

class MockAlbumsAPI implements AlbumsAPI {
  async createAlbum({ name }: { name: string }): Promise<void> {
    const randomId = (Math.random() + 1).toString(36).substring(7);
    const newAlbum = albumBuilder().withId(randomId).withName(name).build();
    this.albums.push(newAlbum);
  }

  albums: Albums = [];
  async fetchAllAlbums(): Promise<Albums> {
    return this.albums;
  }

  async deleteAlbum(id: string): Promise<void> {
    this.albums = this.albums.filter((a) => a.id === id);
  }
}
export class AlbumsTestFixture {
  store!: Store;

  albumsAPI = new MockAlbumsAPI();
  async buildStoreWithInitialState(albums: Albums = []) {
    this.albumsAPI.albums = albums;
    this.store = createTestStore({
      albumsAPI: this.albumsAPI,
    });

    await this.store.dispatch(fetchAllAlbums());

    return this.store;
  }

  givenAlbumsQueryWillReturn(albums: Albums) {
    this.albumsAPI.albums = albums;
  }

  // givenAlbumHasPhotos({
  //   albumId,
  //   photos,
  // }: {
  //   albumId: string;
  //   photos: Photos;
  // }) {
  //   this.albumPhotos.set(albumId, photos);
  //   return this;
  // }

  // whenAddingPhotosToAlbum({
  //   albumId,
  //   newPhotos,
  // }: {
  //   albumId: string;
  //   newPhotos: Photos;
  // }) {
  //   const albumPhotos = this.albumPhotos.get(albumId) || [];
  //   albumPhotos.push(...newPhotos);
  //   this.albumPhotos.set(albumId, albumPhotos);
  // }

  async whenDeleteAlbumById(albumId: AlbumId) {
    await this.store.dispatch(deleteAlbum(albumId));
  }

  async whenCreatingAlbum({ name }: { name: string }) {
    await this.store.dispatch(createAlbum(name));
  }

  thenAllAlbumListShouldBe(expectedAlbumList: Albums) {
    const allAlbums = albumsSelectors.selectAll(this.store.getState());
    expect(allAlbums).toEqual(expectedAlbumList);
  }

  thenAlbumNamesShouldBe(albumsNames: string[]) {
    const allAlbums = albumsSelectors.selectAll(this.store.getState());
    expect(allAlbums.map((a) => a.name)).toEqual(albumsNames);
  }

  albumPhotos = new Map<string, Photos>();

  // thenAlbumPhotosShouldBe({
  //   albumId,
  //   photos,
  // }: {
  //   albumId: string;
  //   photos: Photos;
  // }) {
  //   // expect(this.albumPhotos.get(albumId)).toEqual(photos);
  //   const albumPhotos =
  // }
}
