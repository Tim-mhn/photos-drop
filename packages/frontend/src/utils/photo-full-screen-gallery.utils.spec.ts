import { Image, UserImages } from "@shared";
import { describe, it, expect } from "vitest";

const buildPhoto = (id: string): Image => ({
  id,
  url: id,
  date: new Date(),
});

function nextPhotoInGallery({
  photos,
  currentPhoto,
}: {
  photos: UserImages;
  currentPhoto: Image;
}): Image {
  return photos[0]?.images[1];
}
describe("PhotoFullScreenGalleryUtils", () => {
  describe("nextPhoto", () => {
    it("should return the next photo of the same date when it exists", () => {
      const photo1 = buildPhoto("1");
      const photo2 = buildPhoto("2");
      const photo3 = buildPhoto("3");

      const userPhotos: UserImages = [
        {
          date: new Date(),
          images: [photo1, photo2, photo3],
        },
      ];

      const currentPhoto = photo1;

      const nextPhoto = nextPhotoInGallery({
        photos: userPhotos,
        currentPhoto,
      });

      expect(nextPhoto).toEqual(photo2);
    });
  });
});
