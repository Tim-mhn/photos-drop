// import { Store, createTestStore } from "../../../shared/store";
// import { albumsSelectors } from "../albumsSlice";
// import { AlbumId, Albums } from "../domain";
// import { albumBuilder } from "./album.builder";
// import { AlbumsAPI } from "../application/albums.api";
// import { Photos } from "../../photos";

// class MockAlbumsAPI implements AlbumsAPI {
//   async createAlbum({ name }: { name: string }): Promise<void> {
//     const randomId = (Math.random() + 1).toString(36).substring(7);
//     const newAlbum = albumBuilder().withId(randomId).withName(name).build();
//     this.albums.push(newAlbum);
//   }

//   albums: Albums = [];
//   async fetchAllAlbums(): Promise<Albums> {
//     return this.albums;
//   }

//   async deleteAlbum(id: string): Promise<void> {
//     this.albums = this.albums.filter((a) => a.id === id);
//   }
// }
// export class AlbumsTestFixture {
//   store!: Store;

//   albumsAPI = new MockAlbumsAPI();
//   async buildStoreWithInitialState(albums: Albums = []) {
//     this.albumsAPI.albums = albums;
//     this.store = createTestStore({
//       albumsAPI: this.albumsAPI,
//     });

//     await this.store.dispatch(fetchAllAlbums());

//     return this.store;
//   }

//   givenAlbumsQueryWillReturn(albums: Albums) {
//     this.albumsAPI.albums = albums;
//   }

//   async whenDeleteAlbumById(albumId: AlbumId) {
//     await this.store.dispatch(deleteAlbum(albumId));
//   }

//   async whenCreatingAlbum({ name }: { name: string }) {
//     await this.store.dispatch(createAlbum(name));
//   }

//   thenAllAlbumListShouldBe(expectedAlbumList: Albums) {
//     const allAlbums = albumsSelectors.selectAll(this.store.getState());
//     expect(allAlbums).toEqual(expectedAlbumList);
//   }

//   thenAlbumNamesShouldBe(albumsNames: string[]) {
//     const allAlbums = albumsSelectors.selectAll(this.store.getState());
//     expect(allAlbums.map((a) => a.name)).toEqual(albumsNames);
//   }

//   albumPhotos = new Map<string, Photos>();
// }
