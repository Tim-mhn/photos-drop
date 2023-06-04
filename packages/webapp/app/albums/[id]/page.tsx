"use client";
import { LoaderIf, TextSkeleton } from "../../../components/ui";
import { PhotosList } from "../../../components/photos/photos-list/photos-list";
import {
  useGetAlbumPhotosQuery,
  useGetAlbumQuery,
} from "../../../core/features/albums";
import { AlbumActions } from "../../../components/albums/album-actions";

export default function AlbumPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const albumId = params.id;
  const { data: albumPhotosData, isLoading: photosLoading } =
    useGetAlbumPhotosQuery(albumId);

  const photos = albumPhotosData || [];

  const { data: album, isLoading: albumIsLoading } = useGetAlbumQuery(albumId);

  return (
    <div className="flex flex-col w-full h-full justify-start gap-6">
      <div className="flex flex-grow justify-between items-center">
        <TextSkeleton isLoading={albumIsLoading}>
          <div className="text-4xl text-fuchsia-600 tracking-tight font-black underline underline-offset-8">
            {album?.name}
          </div>
        </TextSkeleton>

        <AlbumActions albumId={albumId} />
      </div>

      <div className="overflow-hidden">
        <PhotosList photos={photos} />
      </div>

      <LoaderIf isLoading={photosLoading} />
    </div>
  );
}
