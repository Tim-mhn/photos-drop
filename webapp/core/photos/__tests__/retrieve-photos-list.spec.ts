// import { RootState, createStore } from "../../store";
// import { photosAdapter, photosSlice } from "../photos.slice";
// import { retrievePhotosList } from "../use-cases/retrieve-all-photos.use-case";

// describe("retrieve photos list", () => {
//   it("it should successfully return an empty list of photos", () => {
//     const store = createStore();

//     store.dispatch(retrievePhotosList([]));

//     const photos = photosAdapter
//       .getSelectors<RootState>((state) => state.photos)
//       .selectAll(store.getState());

//     expect(photos).toEqual([]);
//   });

//   it("it should successfully return the right list of photos", () => {
//     //expected

//     const store = createStore();

//     store.dispatch(
//       retrievePhotosList([
//         {
//           id: "photo1",
//           url: "https://photo-1.jpg",
//         },
//         {
//           id: "photo2",
//           url: "https://photo-2.jpg",
//         },
//       ])
//     );

//     const photos = photosAdapter
//       .getSelectors<RootState>((state) => state.photos)
//       .selectAll(store.getState());

//     expect(photos).toEqual([
//       {
//         id: "photo1",
//         url: "https://photo-1.jpg",
//       },
//       {
//         id: "photo2",
//         url: "https://photo-2.jpg",
//       },
//     ]);
//   });
// });
