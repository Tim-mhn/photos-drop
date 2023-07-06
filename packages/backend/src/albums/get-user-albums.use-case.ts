import { Inject, Injectable } from '@nestjs/common';
import { Album } from './album';
import { AlbumsRepository } from './create-album.use-case';
import { ALBUMS_REPOSITORY_TOKEN } from './providers';

class AlbumList {
  constructor(private albums: Album[]) {}

  sortByName(): Album[] {
    return this.albums.sort((a1: Album, a2: Album) =>
      a1.name.localeCompare(a2.name),
    );
  }
}

@Injectable()
export class GetUserAlbumsUseCase {
  constructor(
    @Inject(ALBUMS_REPOSITORY_TOKEN) private albumsRepo: AlbumsRepository,
  ) {}

  async execute(owner: { id: string }) {
    const userAlbums = await this.albumsRepo.getAllAlbumsOfUser(owner);
    const albumList = new AlbumList(userAlbums);
    return albumList.sortByName();
  }
}
