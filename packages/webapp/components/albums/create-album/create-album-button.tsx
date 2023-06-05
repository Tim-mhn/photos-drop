"use client";
import { useState } from "react";
import { Button } from "../../ui";
import { Images } from "@shared";
import { CreateAlbumDialog } from "./create-album-dialog";

export const CreateAlbumButton = (
  { selectedPhotos }: { selectedPhotos: Images } = {
    selectedPhotos: [],
  },
) => {
  const [open, setOpen] = useState(false);

  const openDialog = () => {
    setOpen(true);
    console.log("open dialog called");
  };
  const closeDialog = () => {
    console.log("clsoe dialog called");
    setOpen(false);
  };

  return (
    <>
      <Button style="simple" size="sm" onClick={openDialog}>
        Create album
      </Button>

      <CreateAlbumDialog
        closeDialog={closeDialog}
        open={open}
        selectedPhotos={selectedPhotos}
      />
    </>
  );
};
