import { albumBuilder } from "./album.builder";
import { AlbumsTestFixture } from "./test.fixture";

describe("Create Album", () => {
  let testFixture: AlbumsTestFixture;

  beforeEach(() => (testFixture = new AlbumsTestFixture()));
  it("after successfully creating the album, it should be added to the list of albums", async () => {
    const initialAlbums = [
      albumBuilder().withId("1").withName("album1").build(),
      albumBuilder().withId("2").withName("album2").build(),
    ];
    await testFixture.buildStoreWithInitialState(initialAlbums);

    await testFixture.whenCreatingAlbum({ name: "new album" });

    testFixture.thenAlbumNamesShouldBe(["album1", "album2", "new album"]);
  });
});
