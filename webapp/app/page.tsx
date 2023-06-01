"use client";
import React, { useEffect } from "react";
import { PhotosList } from "../components/photos/photos-list/photos-list";
import { useDispatch } from "react-redux";
import { fetchAllPhotos } from "../core/features/photos/use-cases/retrieve-all-photos.use-case";
import { useAppSelector, AppDispatch } from "../core/shared/store";

export default function PhotosPage() {
  const photos = useAppSelector((state) => state.photos.photos);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);

  return <PhotosList photos={photos} />;
}
