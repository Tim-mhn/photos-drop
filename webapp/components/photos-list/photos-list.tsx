/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Photo, Photos } from "../../core/features/photos";
import { PhotoComponent } from "../photo";
import { PhotosBulkActions } from "../photos-bulk-actions";
import { FullScreenPhotoGallery } from "../full-screen-photo-gallery/full-screen-photo-gallery";

type PhotosListProps = {
  photos: Photos;
};
export const PhotosList = ({ photos }: PhotosListProps) => {
  const [selectedPhotos, setSelectedPhotos] = useState([] as Photos);

  const togglePhotoSelection = (photo: Photo) => {
    const updatedSelectedPhotosIds = updateSelectedPhotos(
      selectedPhotos,
      photo
    );
    setSelectedPhotos(updatedSelectedPhotosIds);
  };

  const unselectAllPhotos = () => setSelectedPhotos([]);

  const [fullScreenPhoto, setFullScreenPhoto] = useState<Photo | undefined>(
    undefined
  );

  const [fullScreenGalleryOpen, setFullScreenGalleryOpen] = useState(false);

  const openFullScreenGalleryWithInitialPhoto = (photo: Photo) => {
    setFullScreenPhoto(photo);
    setFullScreenGalleryOpen(true);
  };

  return (
    <div className="flex flex-col flex-grow h-full w-full overflow-auto gap-4 text-gray-800 ">
      {selectedPhotos.length > 0 && (
        <PhotosBulkActions
          selectedPhotos={selectedPhotos}
          onClearClick={unselectAllPhotos}
          unSelectPhotos={unselectAllPhotos}
        />
      )}

      <div className="flex flex-grow  grid grid-cols-6 overflow-auto border border-4 rounded-md border-fuchsia-500">
        {photos.map((photo, n) => (
          <div
            onClick={() => openFullScreenGalleryWithInitialPhoto(photo)}
            key={photo.id}
          >
            <PhotoComponent
              photo={photo}
              isSelected={listIncludesPhoto(selectedPhotos, photo)}
              onSelectedToggle={togglePhotoSelection}
            />
          </div>
        ))}
      </div>

      <FullScreenPhotoGallery
        fullScreenPhoto={fullScreenPhoto}
        setFullScreenPhoto={setFullScreenPhoto}
        allPhotos={photos}
        open={fullScreenGalleryOpen}
        close={() => setFullScreenGalleryOpen(false)}
      />
    </div>
  );
};

export function updateSelectedPhotos(
  currentSelectedPhotos: Photo[],
  toggledPhoto: Photo
) {
  const photoIsAlreadySelected = listIncludesPhoto(
    currentSelectedPhotos,
    toggledPhoto
  );
  if (photoIsAlreadySelected) {
    const photosWithoutToggledPhoto = currentSelectedPhotos.filter(
      (photo) => photo.id != toggledPhoto.id
    );
    return photosWithoutToggledPhoto;
  }

  const addPhotoToPhotoList = [...currentSelectedPhotos, toggledPhoto];
  return addPhotoToPhotoList;
}

function listIncludesPhoto(photoList: Photos, searchPhoto: Photo) {
  return !!photoList.find((p) => p.id === searchPhoto.id);
}
