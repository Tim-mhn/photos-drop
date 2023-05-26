import { albumsSelectors } from "../albumsSlice";
import { fetchAllAlbums } from "../use-cases/fetch-all-albums/fetch-all-albums";
import { albumBuilder } from "./album.builder";
import { AlbumsTestFixture } from "./test.fixture";

describe("AlbumList", () => {
  let testFixture: AlbumsTestFixture;

  beforeEach(() => (testFixture = new AlbumsTestFixture()));
  it("selectAllAlbums should correctly return the list of all albums", async () => {
    const store = await testFixture.buildStoreWithInitialState();

    const albums = [
      albumBuilder().withId("album-1").build(),
      albumBuilder().withId("album-2").build(),
    ];
    testFixture.givenAlbumsQueryWillReturn(albums);

    await store.dispatch(fetchAllAlbums());

    testFixture.thenAllAlbumListShouldBe(albums);
  });

  it("selectTotal should return the correct albums count", async () => {
    const store = await testFixture.buildStoreWithInitialState();

    const albums = [
      albumBuilder().withId("album-1").build(),
      albumBuilder().withId("album-2").build(),
      albumBuilder().withId("album-3").build(),
      albumBuilder().withId("album-4").build(),
      albumBuilder().withId("album-5").build(),
      albumBuilder().withId("album-6").build(),
    ];

    testFixture.givenAlbumsQueryWillReturn(albums);

    await store.dispatch(fetchAllAlbums());

    expect(albumsSelectors.selectTotal(store.getState())).toEqual(6);
  });
});
