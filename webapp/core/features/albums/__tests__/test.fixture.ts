import { Store, createTestStore } from "../../../store";
import { albumsSelectors } from "../albumsSlice";
import { AlbumId, Albums } from "../entities";
import { AllAlbumsQuery } from "../use-cases/fetch-all-albums/all-albums.query";
import { deleteAlbum } from "../use-cases/delete-album/delete-album";
import { fetchAllAlbums } from "../use-cases/fetch-all-albums/fetch-all-albums";
import { createAlbum } from "../use-cases/create-album/create-album";
import { albumBuilder } from "./album.builder";

export class AlbumsTestFixture {
  store!: Store;

  private mockAlbums: Albums = [];
  private mockAlbumsQuery: AllAlbumsQuery = async () => {
    console.count("fetch all albums");
    return this.mockAlbums;
  };

  async buildStoreWithInitialState(albums: Albums = []) {
    this.mockAlbums = albums;
    this.store = createTestStore({
      allAlbumsQuery: this.mockAlbumsQuery,
    });

    await this.store.dispatch(fetchAllAlbums());

    return this.store;
  }

  givenAlbumsQueryWillReturn(albums: Albums) {
    this.mockAlbums = albums;
  }

  async whenDeleteAlbumById(albumId: AlbumId) {
    await this.store.dispatch(deleteAlbum(albumId));
    this.mockAlbums = this.mockAlbums.filter((album) => album.id !== albumId);
  }

  async whenCreatingAlbum({ name }: { name: string }) {
    this.mockAlbums.push(
      albumBuilder().withId("okcoaecoeac").withName(name).build()
    );

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
}
