"use client";
import React, { useState } from "react";
import {
  Photo,
  Photos,
  photosRetriever,
} from "../core/photos/use-cases/retrieve-all-photos.use-case";
import { PhotoComponent } from "../components/photo";

export default function PhotosPage() {
  const photos = photosRetriever.retrieveAllPhotos();

  const [selectedPhotos, setSelectedPhotos] = useState([] as Photos);

  const togglePhotoSelection = (photo: Photo) => {
    const updatedSelectedPhotosIds = updateSelectedPhotos(
      selectedPhotos,
      photo
    );
    setSelectedPhotos(updatedSelectedPhotosIds);
  };

  return (
    <div className="flex flex-grow h-full w-full grid grid-cols-6 gap-4 overflow-auto">
      {photos.map((photo, n) => (
        <PhotoComponent
          photo={photo}
          key={photo.id}
          isSelected={listIncludesPhoto(selectedPhotos, photo)}
          onSelectedToggle={togglePhotoSelection}
        />
      ))}
    </div>
  );
}

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
