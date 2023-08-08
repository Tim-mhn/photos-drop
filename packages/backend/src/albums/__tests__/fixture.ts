import { Album, CreateAlbumProps } from '../album';
import {
  CreateAlbumUseCase,
  CurrentDateGetter,
} from '../create-album.use-case';
import { GetUserAlbumsUseCase } from '../get-user-albums.use-case';
import { InMemoryAlbumsRepository } from './mocks';

export class AlbumsTestFixture {
  albums: Album[] = [];

  albumsRepo = new InMemoryAlbumsRepository();
  currentDateGetter: CurrentDateGetter = {
    getCurrentDate: jest.fn(),
  };
  createAlbumUseCase = new CreateAlbumUseCase(
    this.albumsRepo,
    this.currentDateGetter,
  );
  getUserAlbumsUseCase = new GetUserAlbumsUseCase(this.albumsRepo);

  givenAlbumsAre(albums: Album[]) {
    this.albumsRepo.albums = albums;
    return this;
  }

  givenNowIs(date: Date) {
    jest
      .spyOn(this.currentDateGetter, 'getCurrentDate')
      .mockImplementation(() => date);
  }

  async whenCreatingAlbum(partialProps: Partial<CreateAlbumProps>) {
    const defaultProps: Omit<CreateAlbumProps, 'currentDate'> = {
      name: 'album name',
      owner: {
        id: 'owner-id',
      },
      photosCount: 0,
    };

    const props = {
      ...defaultProps,
      ...partialProps,
    };

    this.createAlbumUseCase.execute(props);
  }

  async getAlbumByName({ name }: { name: string }) {
    return this.albumsRepo.albums.find((a) => a.name === name);
  }

  async getUserAlbums(owner: { id: string }) {
    return this.getUserAlbumsUseCase.execute(owner);
  }
  thenListOfAlbumsShouldContain({ name }: { name: string }) {
    expect(this.albumsRepo.albums.map((a) => a.name)).toContainEqual(name);
  }
}
