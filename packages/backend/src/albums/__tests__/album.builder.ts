import { Album } from '../album';

class AlbumBuilder {
  private name: string;
  private owner: { id: string };
  private creationDate: Date;

  withOwner(owner: { id: string }) {
    this.owner = owner;
    return this;
  }

  withCreationDate(date: Date) {
    this.creationDate = date;
    return this;
  }

  withName(name: string) {
    this.name = name;
    return this;
  }

  build() {
    return Album.create({
      name: this.name,
      owner: this.owner,
      currentDate: this.creationDate,
    });
  }
}

export const albumBuilder = () => new AlbumBuilder();
