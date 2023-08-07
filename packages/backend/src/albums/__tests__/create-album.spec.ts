import { EmptyAlbumName } from '../album.errors';
import { AlbumsTestFixture } from './fixture';

describe('Create album', () => {
  let fixture: AlbumsTestFixture;

  beforeEach(() => {
    fixture = new AlbumsTestFixture();
  });
  it('successfully creates an album and can be retrieved', async () => {
    fixture.givenAlbumsAre([]);

    await fixture.whenCreatingAlbum({ name: 'My album' });

    fixture.thenListOfAlbumsShouldContain({
      name: 'My album',
    });
  });

  it('throws an error when creating an album with an empty name', async () => {
    fixture.givenAlbumsAre([]);

    const createAlbumFn = () => fixture.whenCreatingAlbum({ name: '' });

    expect(createAlbumFn()).rejects.toThrowError(EmptyAlbumName);
  });

  it('should set the creationDate as now', async () => {
    const date = new Date('2023/07/06 10:00:00');
    fixture.givenNowIs(date);
    await fixture.whenCreatingAlbum({ name: 'new album' });

    const album = await fixture.getAlbumByName({ name: 'new album' });

    expect(album.creationDate).toEqual(date);
  });
});
