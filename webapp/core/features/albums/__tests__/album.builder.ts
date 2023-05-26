import { Album } from "../entities";

const DEFAULT_PROPS: Album = {
  coverPhoto: "cover-photo.jpeg",
  id: "album-1",
  itemsCount: 10,
  name: "Album 1",
};

export const albumBuilder = (props = DEFAULT_PROPS) => {
  return {
    withId(_id: string) {
      return albumBuilder({
        ...props,
        id: _id,
      });
    },

    withName(_name: string) {
      return albumBuilder({
        ...props,
        name: _name,
      });
    },
    withCoverPhoto(_coverPhoto: string) {
      return albumBuilder({
        ...props,
        coverPhoto: _coverPhoto,
      });
    },

    build() {
      return props;
    },
  };
};
