import { Image, UserImages } from "@shared";
import { describe, it, expect, beforeEach } from "vitest";
import { PhotosGallery } from "./photos-gallery";

const buildPhoto = (id: string): Image => ({
  id,
  url: id,
  date: new Date(),
});

describe("PhotoFullScreenGalleryUtils", () => {
  const photo1 = buildPhoto("1");
  const photo2 = buildPhoto("2");
  const photo3 = buildPhoto("3");
  const photo4 = buildPhoto("4");
  const photo5 = buildPhoto("5");
  const photo6 = buildPhoto("6");

  let photosGallery: PhotosGallery;
  beforeEach(() => {
    const userPhotos: UserImages = [
      {
        date: new Date(),
        images: [photo1, photo2, photo3],
      },
      {
        date: new Date(),
        images: [photo4, photo5, photo6],
      },
    ];
    photosGallery = PhotosGallery.fromUserPhotos(userPhotos);
  });
  describe("getNextPhotoInGallery", () => {
    it("should return the next photo of the same date when it exists", () => {
      photosGallery.showPhoto(photo1);

      photosGallery.gotoNextPhoto();
      expect(photosGallery.currentPhoto).toEqual(photo2);
    });

    it("should throw an error if there is no next photo", () => {
      photosGallery.showPhoto(photo6);

      const fn = () => photosGallery.gotoNextPhoto();
      expect(fn).toThrow();
    });

    it("should return the first photo of the next date when the current photo is the last one of a given date", () => {
      photosGallery.showPhoto(photo3);

      photosGallery.gotoNextPhoto();
      expect(photosGallery.currentPhoto).toEqual(photo4);
    });
  });

  describe("getPreviousPhotoInGallery", () => {
    it("should return the next photo of the same date when it exists", () => {
      photosGallery.showPhoto(photo3);
      photosGallery.goToPreviousPhoto();
      expect(photosGallery.currentPhoto).toEqual(photo2);
    });
  });

  describe("hasPreviousPhoto", () => {
    it("should return false when the selected photo is the first one", () => {
      photosGallery.showPhoto(photo1);

      expect(photosGallery.hasPreviousPhoto()).toBeFalsy();
    });

    it("should return true when the selected photo is not the first one", () => {
      photosGallery.showPhoto(photo2);

      expect(photosGallery.hasPreviousPhoto()).toBeTruthy();
    });
  });

  describe("hasNextPhoto", () => {
    it("should return true when the selected photo is the first one", () => {
      photosGallery.showPhoto(photo1);

      expect(photosGallery.hasNextPhoto()).toBeTruthy();
    });

    it("should return false when the selected photo is not the first one", () => {
      photosGallery.showPhoto(photo6);

      expect(photosGallery.hasNextPhoto()).toBeFalsy();
    });
  });
});
