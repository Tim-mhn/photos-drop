import { Images } from "@shared";
import { getNextPhoto, getPreviousPhoto } from "./previous-next-photo";

describe("getPreviousPhoto", () => {
  it("should correctly return the previous photo from the list", () => {
    const allPhotos: Images = [
      {
        id: "photo1",
        url: "photo1.jpeg",
      },
      {
        id: "photo2",
        url: "photo2.jpeg",
      },
      {
        id: "photo3",
        url: "photo3.jpeg",
      },
      {
        id: "photo4",
        url: "photo4.jpeg",
      },
    ];

    const currentPhoto = {
      id: "photo2",
      url: "photo2.jpeg",
    };

    expect(getPreviousPhoto({ allPhotos, currentPhoto })).toEqual({
      id: "photo1",
      url: "photo1.jpeg",
    });
  });

  it("should return null if there are no previous photos", () => {
    const allPhotos: Images = [
      {
        id: "photo1",
        url: "photo1.jpeg",
      },
      {
        id: "photo2",
        url: "photo2.jpeg",
      },
      {
        id: "photo3",
        url: "photo3.jpeg",
      },
      {
        id: "photo4",
        url: "photo4.jpeg",
      },
    ];

    const currentPhoto = {
      id: "photo1",
      url: "photo1.jpeg",
    };

    expect(getPreviousPhoto({ allPhotos, currentPhoto })).toEqual(null);
  });
});

describe("getNextPhoto", () => {
  it("should correctly return the next photo from the list", () => {
    const allPhotos: Photos = [
      {
        id: "photo1",
        url: "photo1.jpeg",
      },
      {
        id: "photo2",
        url: "photo2.jpeg",
      },
      {
        id: "photo3",
        url: "photo3.jpeg",
      },
      {
        id: "photo4",
        url: "photo4.jpeg",
      },
    ];

    const currentPhoto = {
      id: "photo2",
      url: "photo2.jpeg",
    };

    expect(getNextPhoto({ allPhotos, currentPhoto })).toEqual({
      id: "photo3",
      url: "photo3.jpeg",
    });
  });
});
