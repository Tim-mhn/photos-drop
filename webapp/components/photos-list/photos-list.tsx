import { useState } from "react";
import {
  Photo,
  Photos,
} from "../../core/photos/use-cases/retrieve-all-photos.use-case";
import { PhotoComponent } from "../photo";
import { PhotosBulkActions } from "../photos-bulk-actions";

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
  return (
    <div className="flex flex-col flex-grow h-full w-full overflow-auto gap-4 text-gray-800">
      {selectedPhotos.length > 0 && (
        <PhotosBulkActions
          selectedPhotos={selectedPhotos}
          onClearClick={unselectAllPhotos}
        />
      )}

      <div className="flex flex-grow  grid grid-cols-6 gap-4 overflow-auto">
        {photos.map((photo, n) => (
          <PhotoComponent
            photo={photo}
            key={photo.id}
            isSelected={listIncludesPhoto(selectedPhotos, photo)}
            onSelectedToggle={togglePhotoSelection}
          />
        ))}
      </div>
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
