import { Image, Images, UserImages } from "@shared";

export class PhotosGallery {
  constructor(private photos: Images) {}

  private _currentPhoto: Image | null = null;
  public get currentPhoto() {
    return this._currentPhoto;
  }
  static fromUserPhotos(userPhotos?: UserImages) {
    const allPhotos = userPhotos?.flatMap((p) => p.images) || [];
    return new PhotosGallery(allPhotos);
  }

  setUserPhotos(userPhotos: UserImages) {
    this.photos = userPhotos?.flatMap((p) => p.images) || [];
    this._currentPhoto = null;
  }

  hasPreviousPhoto() {
    return this.currentPhotoIndex > 0;
  }

  hasNextPhoto() {
    return this.currentPhotoIndex < this.photos?.length - 1;
  }

  private get currentPhotoIndex() {
    return this.photos.findIndex((p) => p.id === this.currentPhoto?.id);
  }

  showPhoto(photo: Image) {
    this._currentPhoto = photo;
  }

  gotoNextPhoto() {
    this._goToPhoto({ step: +1 });
  }

  goToPreviousPhoto() {
    this._goToPhoto({ step: -1 });
  }

  private _goToPhoto({ step }: { step: 1 | -1 }) {
    const targetPhoto = this._getFollowingPhotoInGallery({ step });
    this._currentPhoto = targetPhoto;
  }

  private _getFollowingPhotoInGallery({ step }: { step: 1 | -1 }) {
    const currentPhotoIndex = this.photos.findIndex(
      (p) => p.id === this._currentPhoto?.id,
    );
    const followingPhotoIndex = currentPhotoIndex + step;

    if (followingPhotoIndex < 0 || followingPhotoIndex > this.photos.length - 1)
      throw new Error(
        `[getFollowingPhotoInGallery] photo index is out of bounds. Index: ${followingPhotoIndex} in list of ${this.photos.length} photos`,
      );
    return this.photos[followingPhotoIndex];
  }
}
