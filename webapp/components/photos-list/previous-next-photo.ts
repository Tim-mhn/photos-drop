import { Photo, Photos } from "../../core/photos";

export function getPreviousPhoto({
  allPhotos,
  currentPhoto,
}: {
  allPhotos: Photos;
  currentPhoto: Photo;
}): Photo {
  return getFollowingPhotoFromList({ allPhotos, currentPhoto, step: -1 });
}

export function getNextPhoto({
  allPhotos,
  currentPhoto,
}: {
  allPhotos: Photos;
  currentPhoto: Photo;
}): Photo {
  return getFollowingPhotoFromList({ allPhotos, currentPhoto, step: 1 });
}

function getFollowingPhotoFromList({
  allPhotos,
  currentPhoto,
  step,
}: {
  allPhotos: Photos;
  currentPhoto: Photo;
  step: number;
}) {
  const currentIndex = allPhotos.findIndex((p) => p.id === currentPhoto.id);
  const newPhotoIndex = currentIndex + step;
  return allPhotos[newPhotoIndex] || null;
}
