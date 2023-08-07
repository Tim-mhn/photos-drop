import { albumBuilder } from '../../albums/__tests__/album.builder';
import { AlbumsRepository } from '../../albums/create-album.use-case';
import { ImagesRepository } from '../../images/image.repository';
import { ImagesService } from '../../images/images.service';
import {
  AlbumPhotosRepository,
  AlbumPhotosService,
  UserUnauthorizedToEditAlbum,
} from '../add-photos-to-album.use-case';

describe('add photos to album', () => {
  let service: AlbumPhotosService;
  let albumPhotosRepo: AlbumPhotosRepository;
  let imagesService: ImagesService;
  let imagesRepo: ImagesRepository;
  let albumsRepo: AlbumsRepository;

  beforeEach(() => {
    albumPhotosRepo = {
      addPhotosToAlbum: jest.fn(),
      getAlbumPhotosIds: async () => [],
    };

    imagesRepo = {
      getImagesUrls: jest.fn(),
      uploadToStorage: jest.fn(),
    };
    imagesService = new ImagesService(imagesRepo);

    albumsRepo = {
      save: jest.fn(),
      getAllAlbumsOfUser: jest.fn(),
      getAlbumById: jest.fn(),
    };

    service = new AlbumPhotosService(
      albumPhotosRepo,
      imagesService,
      albumsRepo,
    );
  });
  it('should not be allowed to add photos to album not owned by user', async () => {
    const ownerId = 'owner-id';
    const otherUserId = 'other-user-id';
    const album = albumBuilder()
      .withOwner({ id: ownerId })
      .withName('my album')
      .build();

    jest
      .spyOn(albumsRepo, 'getAlbumById')
      .mockImplementation(async () => album);

    const fn = () =>
      service.addPhotosToAlbum({
        userId: otherUserId,
        albumId: album.id,
        photosIds: ['photo1', 'photo2'],
      });

    expect(fn).rejects.toThrowError(UserUnauthorizedToEditAlbum);
  });
});
