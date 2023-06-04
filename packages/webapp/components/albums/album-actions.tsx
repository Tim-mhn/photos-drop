"use client";
import { useDeleteAlbumMutation } from "../../core/features/albums";
import { Dropdown, DropdownOptionCmp, IconButton } from "../ui";
import { useRouter } from "next/navigation";

export const AlbumActions = ({ albumId }: { albumId: string }) => {
  const trigger = <IconButton icon="dots" />;

  const router = useRouter();

  const [deleteAlbumMutation] = useDeleteAlbumMutation();

  const deleteAlbumAndNavigateBack = async () => {
    await deleteAlbumMutation(albumId);
    router.push("/albums");
  };
  return (
    <Dropdown trigger={trigger}>
      <DropdownOptionCmp
        onClick={async () => await deleteAlbumAndNavigateBack()}
      >
        Delete album
      </DropdownOptionCmp>
    </Dropdown>
  );
};
