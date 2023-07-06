import { Album } from '../album';
import { AlbumsRepository } from '../create-album.use-case';

export class InMemoryAlbumsRepository implements AlbumsRepository {
  albums: Album[] = [];
  async save(album: Album): Promise<void> {
    this.albums.push(album);
  }
  async getAllAlbumsOfUser(owner: { id: string }): Promise<Album[]> {
    return this.albums?.filter((a) => a.owner.id === owner.id) || [];
  }
}
