"use client";
import React, { useEffect } from "react";
import { PhotosList } from "../components/photos-list/photos-list";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../core/redux/store";
import { fetchAllPhotos } from "../core/photos/use-cases/retrieve-all-photos.use-case";
import { Photos } from "../core/photos";

export default function PhotosPage() {
  const photos = useSelector<RootState, Photos>((state) => state.photos);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchAllPhotos());
  }, [dispatch]);

  return <PhotosList photos={photos} />;
}
