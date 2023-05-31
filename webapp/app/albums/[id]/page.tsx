"use client";
import { Divider } from "../../../components/ui";
import { PhotosList } from "../../../components/photos-list/photos-list";
import { useSelector } from "react-redux";
import { albumsSelectors } from "../../../core/features/albums/albumsSlice";
import { RootState } from "../../../core/store";
import { Album } from "../../../core/features/albums";
import { useQuery } from "react-query";
import { getAlbumPhotos } from "../../../core/features/album-photos";

export default function AlbumPhotosPage({
  params,
}: {
  params: { id: string };
}) {
  const albumId = params.id;
  const { data, isLoading } = useQuery({
    queryKey: ["album-photos", albumId],
    queryFn: () => getAlbumPhotos({ albumId }),
  });

  const photos = data || [];
  const album = useSelector<RootState, Album | undefined>((state) =>
    albumsSelectors.selectById(state, albumId)
  );

  return (
    <div className="flex flex-col w-full h-full justify-start gap-6">
      <div className="text-4xl text-fuchsia-600 font-semibold">
        {album?.name}
      </div>

      <Divider />

      <div>
        <PhotosList photos={photos} />
      </div>
    </div>
  );
}
