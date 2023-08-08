import * as path from 'path';
import { Album } from '../album';
import { AlbumsRepository } from '../create-album.use-case';
import { randomId, readJSONFile, writeJSONFile } from '../../common/fs';

type AlbumPersistence = {
  id: string;
  name: string;
  creationDate: string;
  ownerId: string;
  photosIds: string[];
};

export type AlbumPersistenceModel = AlbumPersistence[];
export const ALBUMS_FILE = path.join(
  process.cwd(),
  'src',
  'albums',
  'persistence',
  'albums-v2.json',
);

export class FileSystemV2AlbumsRepository implements AlbumsRepository {
  async save(album: Album): Promise<void> {
    const albumData: AlbumPersistence = {
      creationDate: album?.creationDate?.toISOString(),
      id: randomId(),
      name: album.name,
      ownerId: album.owner.id,
      photosIds: [],
    };

    const data = (await this._getAllData()) || [];

    data.push(albumData);

    await writeJSONFile(ALBUMS_FILE, data);
  }
  async getAllAlbumsOfUser(owner: { id: string }): Promise<Album[]> {
    const data = await this._getAllData();
    const ownerAlbumsData = data.filter((album) => album.ownerId === owner.id);
    return ownerAlbumsData.map(
      ({ creationDate, id, name, ownerId, photosIds }) =>
        Album.create({
          currentDate: new Date(creationDate),
          name,
          id,
          owner: {
            id: ownerId,
          },
          photosCount: photosIds.length,
        }),
    );
  }
  async getAlbumById(id: string): Promise<Album> {
    const data = await this._getAllData();
    const albumData = data.find((alb) => alb.id === id);

    if (!albumData) throw new Error(`could not find album ${id}`);

    return Album.create({
      currentDate: new Date(albumData.creationDate),
      name: albumData.name,
      owner: {
        id: albumData.ownerId,
      },
      photosCount: albumData.photosIds.length,
      id: albumData.id,
    });
  }

  private async _getAllData() {
    return await readJSONFile<AlbumPersistenceModel>(ALBUMS_FILE);
  }
}
