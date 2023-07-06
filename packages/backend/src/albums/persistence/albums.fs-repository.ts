import * as path from 'path';
import { Album } from '../album';
import { AlbumsRepository } from '../create-album.use-case';
import { readFile, writeFile } from 'fs/promises';

const ALBUMS_FILE = path.join(
  process.cwd(),
  'src',
  'albums',
  'persistence',
  'albums.json',
);

type OwnerId = string;
type AlbumPersistence = {
  creationDate: string;
  name: string;
  id: string;
};
type AlbumsPersistenceModel = Record<OwnerId, AlbumPersistence[]>;

export class FileSystemAlbumsRepository implements AlbumsRepository {
  async save(album: Album): Promise<void> {
    const { creationDate, name, owner } = album;
    const albumPersistence: AlbumPersistence = {
      creationDate: creationDate.toISOString(),
      id: randomId(),
      name,
    };

    const usersAlbumsMap = await this._getUsersAlbumsMap();
    if (usersAlbumsMap[owner.id]) {
      usersAlbumsMap[owner.id].push(albumPersistence);
    } else {
      usersAlbumsMap[owner.id] = [albumPersistence];
    }

    this._saveUserAlbums(usersAlbumsMap);
  }
  async getAllAlbumsOfUser(owner: { id: string }): Promise<Album[]> {
    const albumsMap = await this._getUsersAlbumsMap();
    const userAlbums = albumsMap[owner.id] || [];
    return userAlbums.map(({ creationDate, name, id }) =>
      Album.create({
        currentDate: new Date(creationDate),
        name,
        owner,
        id,
      }),
    );
  }
  private async _getUsersAlbumsMap() {
    try {
      return await readJSONFile<AlbumsPersistenceModel>(ALBUMS_FILE);
    } catch (err) {
      return {} as AlbumsPersistenceModel;
    }
  }

  private async _saveUserAlbums(data: AlbumsPersistenceModel) {
    await writeJSONFile(ALBUMS_FILE, data);
  }
}

function writeJSONFile<I = any>(filename: string, data: I) {
  return writeFile(filename, JSON.stringify(data));
}

async function readJSONFile<O = any>(filename: string) {
  const data = await readFile(filename, {
    encoding: 'utf-8',
  });

  return JSON.parse(data) as O;
}

const randomId = () => (Math.random() + 1).toString(36).substring(2);
