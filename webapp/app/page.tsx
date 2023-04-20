"use client";
import React from "react";
import { photosRetriever } from "../core/photos/use-cases/retrieve-all-photos.use-case";
import { PhotosList } from "../components/photos-list/photos-list";

export default function PhotosPage() {
  const photos = photosRetriever.retrieveAllPhotos();

  return <PhotosList photos={photos} />;
}
