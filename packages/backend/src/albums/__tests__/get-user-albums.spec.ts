import { albumBuilder } from './album.builder';
import { AlbumsTestFixture } from './fixture';

describe('Get albums', () => {
  let fixture: AlbumsTestFixture;

  beforeEach(() => {
    fixture = new AlbumsTestFixture();
  });

  it("should return the list of all the user's albums sorted by ascending alphabetical order", async () => {
    const owner1 = {
      id: 'user1',
    };
    const owner2 = {
      id: 'user2',
    };
    fixture.givenAlbumsAre([
      albumBuilder().withOwner(owner1).withName('album-1').build(),
      albumBuilder().withOwner(owner1).withName('album-2').build(),
      albumBuilder().withOwner(owner2).withName('Cambodia').build(),
      albumBuilder().withOwner(owner2).withName('Italy').build(),
      albumBuilder().withOwner(owner2).withName('Austria').build(),
    ]);

    const albums = await fixture.getUserAlbums(owner2);

    expect(albums.map((a) => a.name)).toEqual(['Austria', 'Cambodia', 'Italy']);
  });
});
