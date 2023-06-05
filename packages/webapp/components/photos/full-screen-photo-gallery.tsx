/* eslint-disable @next/next/no-img-element */
import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/20/solid";
import { Image, Images } from "@shared";
import { DialogUI } from "../ui";
import {
  getNextPhoto,
  getPreviousPhoto,
} from "./photos-list/previous-next-photo";

export const FullScreenPhotoGallery = ({
  fullScreenPhoto,
  setFullScreenPhoto,
  allPhotos,
  open,
  close,
}: {
  fullScreenPhoto: Image | undefined;
  setFullScreenPhoto: (photo: Image) => void;
  allPhotos: Images;
  open: boolean;
  close: () => void;
}) => {
  const moveToPreviousPhoto = () => {
    if (!fullScreenPhoto) return;

    const previousPhoto = getPreviousPhoto({
      allPhotos,
      currentPhoto: fullScreenPhoto,
    });
    setFullScreenPhoto(previousPhoto);
  };

  const moveToNextPhoto = () => {
    if (!fullScreenPhoto) return;

    const previousPhoto = getNextPhoto({
      allPhotos,
      currentPhoto: fullScreenPhoto,
    });
    setFullScreenPhoto(previousPhoto);
  };

  return (
    <DialogUI open={open} close={close} title="" fullScreen={true} color="dark">
      <div className="flex flex-col relative w-full h-full items-center justify-center">
        <img
          src={fullScreenPhoto?.url || ""}
          alt="photo"
          className="max-h-full max-w-full"
        />

        <div className="absolute top-0 w-full h-10 items-center px-2 py-1 ">
          <div
            className="rounded-full p-1 cursor-pointer hover:bg-fuchsia-800 w-fit h-fit"
            onClick={close}
          >
            <ArrowLeftIcon className="h-6 w-6" color="white" />
          </div>
        </div>

        <div className="absolute top-1/3 bottom-1/3 left-0 right-0 flex items-center justify-between px-3  ">
          <div className="h-full group w-1/2 flex items-center">
            <div
              className="rounded-full p-1 cursor-pointer w-fit h-fit invisible group-hover:visible"
              onClick={moveToPreviousPhoto}
            >
              <ArrowLeftCircleIcon className="h-12 w-12" color="white" />
            </div>
          </div>

          <div className="h-full group w-1/2 flex items-center justify-end">
            <div
              className="rounded-full p-1 cursor-pointer w-fit h-fit invisible group-hover:visible"
              onClick={moveToNextPhoto}
            >
              <ArrowRightCircleIcon className="h-12 w-12" color="white" />
            </div>
          </div>
        </div>
      </div>
    </DialogUI>
  );
};
