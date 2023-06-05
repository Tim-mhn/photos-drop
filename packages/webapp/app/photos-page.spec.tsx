import { updateSelectedPhotos } from "../components/photos/photos-list/photos-list";
import { Image, Images } from "@shared";

describe("TogglePhotoSelection", () => {
  it("should add the photo id if there are no photos selected", () => {
    const noPhotosSelected = [] as Images;

    const togglePhoto: Image = {
      id: "photo1",
      url: "http://photo1.jpeg",
    };

    const updatedSelectedPhotosIds = updateSelectedPhotos(
      noPhotosSelected,
      togglePhoto,
    );

    expect(updatedSelectedPhotosIds).toEqual([togglePhoto]);
  });

  it("should remove the photo id if the photo id is already in the photos selected", () => {
    const togglePhoto: Image = {
      id: "photo1",
      url: "http://photo1.jpeg",
    };

    const photosSelected = [{ id: "photo2", url: "photo2.jpeg" }, togglePhoto];

    const updatedSelectedPhotosIds = updateSelectedPhotos(
      photosSelected,
      togglePhoto,
    );

    expect(updatedSelectedPhotosIds).toEqual([
      { id: "photo2", url: "photo2.jpeg" },
    ]);
  });

  it("should work with a photo with the right id with a different object reference", () => {
    const togglePhoto: Image = {
      id: "photo1",
      url: "http://photo1.jpeg",
    };

    const photosSelected = [{ id: "photo2", url: "photo2.jpeg" }, togglePhoto];

    const updatedSelectedPhotosIds = updateSelectedPhotos(photosSelected, {
      id: "photo1",
      url: "",
    });

    expect(updatedSelectedPhotosIds).toEqual([
      { id: "photo2", url: "photo2.jpeg" },
    ]);
  });
});
