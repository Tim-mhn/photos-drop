import { albumsSelectors } from "../albumsSlice";
import { Albums } from "../entities";
import { albumBuilder } from "./album.builder";
import { AlbumsTestFixture } from "./test.fixture";

describe("Get album by id", () => {
  let testFixture: AlbumsTestFixture;
  beforeEach(() => {
    testFixture = new AlbumsTestFixture();
  });
  it("should return the right album when it exists ", async () => {
    const albums: Albums = [
      albumBuilder().withId("album-1").build(),
      albumBuilder().withId("album-2").build(),
    ];

    const store = await testFixture.buildStoreWithInitialState(albums);

    const album = albumsSelectors.selectById(store.getState(), "album-2");

    expect(album?.id).toEqual("album-2");
  });
});
