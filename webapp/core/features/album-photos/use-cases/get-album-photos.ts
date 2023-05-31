export const getAlbumPhotos = async ({ albumId }: { albumId: string }) => {
  return new Array(30).fill("").map((_, n) => ({
    id: n.toString(),
    url: `https://api.dicebear.com/6.x/personas/svg?seed=${n}`,
  }));
};
