import { updateSelectedPhotos } from "../components/photos-list/photos-list";
import {
  Photo,
  Photos,
} from "../core/photos/use-cases/retrieve-all-photos.use-case";

describe("TogglePhotoSelection", () => {
  it("should add the photo id if there are no photos selected", () => {
    const noPhotosSelected = [] as Photos;

    const togglePhoto: Photo = {
      id: "photo1",
      url: "http://photo1.jpeg",
    };

    const updatedSelectedPhotosIds = updateSelectedPhotos(
      noPhotosSelected,
      togglePhoto
    );

    expect(updatedSelectedPhotosIds).toEqual([togglePhoto]);
  });

  it("should remove the photo id if the photo id is already in the photos selected", () => {
    const togglePhoto: Photo = {
      id: "photo1",
      url: "http://photo1.jpeg",
    };

    const photosSelected = [{ id: "photo2", url: "photo2.jpeg" }, togglePhoto];

    const updatedSelectedPhotosIds = updateSelectedPhotos(
      photosSelected,
      togglePhoto
    );

    expect(updatedSelectedPhotosIds).toEqual([
      { id: "photo2", url: "photo2.jpeg" },
    ]);
  });

  it("should work with a photo with the right id with a different object reference", () => {
    const togglePhoto: Photo = {
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
