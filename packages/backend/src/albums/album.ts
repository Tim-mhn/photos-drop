import { EmptyAlbumName } from './album.errors';
import { IAlbum } from '@shared/models';

export type AlbumId = string;
export type CreateAlbumProps = {
  name: string;
  owner: { id: string };
  currentDate: Date;
  id?: AlbumId;
};
export class Album implements IAlbum {
  private constructor(
    public readonly name: string,
    public readonly creationDate: Date = new Date(Date.now()),
    public readonly owner: { id: string },
    public readonly id?: AlbumId,
  ) {}

  static create({ name, currentDate, owner, id }: CreateAlbumProps) {
    if (name === '') throw new EmptyAlbumName();
    return new Album(name, currentDate, owner, id);
  }

  isOwnedByUser({ userId }: { userId: string }) {
    return this.owner.id === userId;
  }
}
