import { EmptyAlbumName } from './album.errors';

export type CreateAlbumProps = {
  name: string;
  owner: { id: string };
  currentDate: Date;
  id?: string;
};
export class Album {
  private constructor(
    public readonly name: string,
    public readonly creationDate: Date = new Date(Date.now()),
    public readonly owner: { id: string },
    public readonly id?: string,
  ) {}

  static create({ name, currentDate, owner, id }: CreateAlbumProps) {
    if (name === '') throw new EmptyAlbumName();
    return new Album(name, currentDate, owner, id);
  }
}
