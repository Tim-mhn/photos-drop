import { AllPhotosQuery } from "../queries/fetch-all-photos.query";

export const InMemoryPhotosQuery: AllPhotosQuery = async () => {
  return new Array(30).fill("").map((_, n) => ({
    id: n.toString(),
    url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
  }));
};
