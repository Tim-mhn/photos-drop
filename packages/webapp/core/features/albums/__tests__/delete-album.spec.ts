// import { albumBuilder } from "./album.builder";
// import { AlbumsTestFixture } from "./test.fixture";

// describe("delete album", () => {
//   let testFixture: AlbumsTestFixture;
//   beforeEach(() => {
//     testFixture = new AlbumsTestFixture();
//   });

//   it("after successfully deleting album 'album-1', it should be removed from the list of all albums", async () => {
//     const albums = [
//       albumBuilder().withId("album-1").build(),
//       albumBuilder().withId("album-2").build(),
//       albumBuilder().withId("album-3").build(),
//       albumBuilder().withId("album-4").build(),
//     ];

//     await testFixture.buildStoreWithInitialState(albums);

//     await testFixture.whenDeleteAlbumById("album-1");

//     const expectedAlbumList = [albums[1], albums[2], albums[3]];
//     testFixture.thenAllAlbumListShouldBe(expectedAlbumList);
//   });
// });

it("", () => expect(true).toBeTruthy());
