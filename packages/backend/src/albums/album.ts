import { EmptyAlbumName } from './album.errors';
import { IAlbum } from '@shared/models';

export type AlbumId = string;
export type CreateAlbumProps = {
  name: string;
  owner: { id: string };
  currentDate: Date;
  id?: AlbumId;
  photosCount?: number;
};
export class Album implements IAlbum {
  private constructor(
    public readonly name: string,
    public readonly creationDate: Date = new Date(Date.now()),
    public readonly owner: { id: string },
    public readonly id?: AlbumId,
    public readonly photosCount: number = 0,
  ) {}

  static create({
    name,
    currentDate,
    owner,
    id,
    photosCount,
  }: CreateAlbumProps) {
    if (name === '') throw new EmptyAlbumName();
    return new Album(name, currentDate, owner, id, photosCount);
  }

  isOwnedByUser({ userId }: { userId: string }) {
    return this.owner.id === userId;
  }
}
