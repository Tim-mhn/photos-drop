"use client";
import React, { useEffect } from "react";
import { PhotosList } from "../components/photos-list/photos-list";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../core/store/store";
import { fetchAllPhotos } from "../core/features/photos/use-cases/retrieve-all-photos.use-case";
import { Photos } from "../core/features/photos";

export default function PhotosPage() {
  const photos = useSelector<RootState, Photos>((state) => state.photos);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);

  return <PhotosList photos={photos} />;
}
