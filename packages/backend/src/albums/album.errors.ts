export class EmptyAlbumName extends Error {
  constructor() {
    super('Album name cannot be empty');
  }
}

export class NonExistentAlbumOwner extends Error {
  constructor(ownerId: string) {
    super(`Owner ${ownerId} does not exist`);
  }
}
