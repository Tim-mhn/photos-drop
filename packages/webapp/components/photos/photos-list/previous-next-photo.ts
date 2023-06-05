import { Image, Images } from "@shared";
export function getPreviousPhoto({
  allPhotos,
  currentPhoto,
}: {
  allPhotos: Images;
  currentPhoto: Image;
}): Image {
  return getFollowingPhotoFromList({ allPhotos, currentPhoto, step: -1 });
}

export function getNextPhoto({
  allPhotos,
  currentPhoto,
}: {
  allPhotos: Images;
  currentPhoto: Image;
}): Image {
  return getFollowingPhotoFromList({ allPhotos, currentPhoto, step: 1 });
}

function getFollowingPhotoFromList({
  allPhotos,
  currentPhoto,
  step,
}: {
  allPhotos: Images;
  currentPhoto: Image;
  step: number;
}) {
  const currentIndex = allPhotos.findIndex((p) => p.id === currentPhoto.id);
  const newPhotoIndex = currentIndex + step;
  return allPhotos[newPhotoIndex] || null;
}
