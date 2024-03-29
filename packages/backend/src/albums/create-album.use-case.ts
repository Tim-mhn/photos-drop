import { Inject, Injectable, Optional } from '@nestjs/common';
import { Album, AlbumId, CreateAlbumProps } from './album';
import { ALBUMS_REPOSITORY_TOKEN } from './providers';

export interface AlbumsRepository {
  save(album: Album): Promise<void>;
  getAllAlbumsOfUser(owner: { id: string }): Promise<Album[]>;
  getAlbumById(id: AlbumId): Promise<Album>;
}

export type CurrentDateGetter = {
  getCurrentDate: () => Date;
};

const DEFAULT_CURRENT_DATE_GETTER: CurrentDateGetter = {
  getCurrentDate: () => new Date(Date.now()),
};

@Injectable()
export class CreateAlbumUseCase {
  constructor(
    @Inject(ALBUMS_REPOSITORY_TOKEN) private albumsRepository: AlbumsRepository,
    @Optional()
    private currentDateGetter: CurrentDateGetter = DEFAULT_CURRENT_DATE_GETTER,
  ) {}

  async execute(props: Omit<CreateAlbumProps, 'currentDate' | 'photosCount'>) {
    const currentDate = this.currentDateGetter.getCurrentDate();

    const album = Album.create({
      ...props,
      currentDate,
    });
    await this.albumsRepository.save(album);
  }
}
