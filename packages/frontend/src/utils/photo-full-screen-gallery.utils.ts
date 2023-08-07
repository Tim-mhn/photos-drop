import { Image, Images } from "../../../shared/src";

export function getNextPhotoInGallery({
  photos,
  currentPhoto,
}: {
  photos: Images;
  currentPhoto: Image;
}): Image {
  return getFollowingPhotoInGallery({ photos, currentPhoto, step: +1 });
}

export function getPreviousPhotoInGallery({
  photos,
  currentPhoto,
}: {
  photos: Images;
  currentPhoto: Image;
}): Image {
  return getFollowingPhotoInGallery({ photos, currentPhoto, step: -1 });
}

function getFollowingPhotoInGallery({
  photos,
  currentPhoto,
  step,
}: {
  photos: Images;
  currentPhoto: Image;
  step: number;
}) {
  const currentPhotoIndex = photos.findIndex((p) => p.id === currentPhoto.id);
  const followingPhotoIndex = currentPhotoIndex + step;

  if (followingPhotoIndex < 0 || followingPhotoIndex > photos.length - 1)
    throw new Error(
      `[getFollowingPhotoInGallery] photo index is out of bounds. Index: ${followingPhotoIndex} in list of ${photos.length} photos`,
    );
  return photos[followingPhotoIndex];
}
