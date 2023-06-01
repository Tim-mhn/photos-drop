"use client";
import { Divider, LoaderIf } from "../../../components/ui";
import { PhotosList } from "../../../components/photos-list/photos-list";
import { useGetAlbumQuery } from "../../../core/features/albums";
import { useQuery } from "react-query";
import { getAlbumPhotos } from "../../../core/features/album-photos";

export default function AlbumPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const albumId = params.id;
  const { data } = useQuery({
    queryKey: ["album-photos", albumId],
    queryFn: () => getAlbumPhotos({ albumId }),
  });

  const photos = data || [];

  const { data: album, isLoading } = useGetAlbumQuery(albumId);

  return (
    <div className="flex flex-col w-full h-full justify-start gap-6">
      <div className="text-4xl text-fuchsia-600 font-semibold">
        {album?.name}
      </div>

      <Divider />

      <div>
        <PhotosList photos={photos} />
      </div>

      <LoaderIf isLoading={isLoading} />
    </div>
  );
}
