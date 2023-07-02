import { GetAllImagesUseCase } from '../get-all-images.use-case';
import { UserImagesRepository } from '../image.repository';

describe('getUserImages', () => {
  let userImagesRepo: UserImagesRepository;

  let usecase: GetAllImagesUseCase;

  beforeEach(() => {
    userImagesRepo = {
      getImagesOfUser: jest.fn(),
      saveImagesOfUser: jest.fn(),
    };

    usecase = new GetAllImagesUseCase(userImagesRepo);
  });
  it('should return images grouped by date', async () => {
    const image1 = {
      url: 'https://image1.jpeg',
      id: '1',
      date: new Date('2023-07-01 10:00:00'),
    };
    const image2 = {
      url: 'https://image2.jpeg',
      id: '2',
      date: new Date('2023-07-01 08:00:00'),
    };
    const image3 = {
      url: 'https://image3.jpeg',
      id: '3',
      date: new Date('2023-06-30 08:00:00'),
    };
    const image4 = {
      url: 'https://image4.jpeg',
      id: '4',
      date: new Date('2023-06-30 04:00:00'),
    };
    jest
      .spyOn(userImagesRepo, 'getImagesOfUser')
      .mockImplementation(async () => [image1, image2, image3, image4]);
    const userImages = await usecase.getImagesOfUserGroupedByDate('');

    expect(userImages).toEqual([
      {
        date: new Date('2023-07-01'),
        images: [image1, image2],
      },
      {
        date: new Date('2023-06-30'),
        images: [image3, image4],
      },
    ]);
  });

  it('dates should be sorted by most recent first', async () => {
    const image1 = {
      url: 'https://image1.jpeg',
      id: '1',
      date: new Date('2023-06-28 10:00:00'),
    };
    const image2 = {
      url: 'https://image2.jpeg',
      id: '2',
      date: new Date('2023-07-08 08:00:00'),
    };
    const image3 = {
      url: 'https://image3.jpeg',
      id: '3',
      date: new Date('2023-06-30 08:00:00'),
    };
    const image4 = {
      url: 'https://image4.jpeg',
      id: '4',
      date: new Date('2023-07-08 04:00:00'),
    };
    const image5 = {
      date: new Date('2023-06-30 08:00:00'),
      id: '3',
      url: 'https://images3.jpeg',
    };

    jest
      .spyOn(userImagesRepo, 'getImagesOfUser')
      .mockImplementation(async () => [image1, image2, image3, image4, image5]);
    const userImages = await usecase.getImagesOfUserGroupedByDate('');

    const imageDates = userImages.map((i) => i.date);
    expect(imageDates).toEqual([
      new Date('2023-07-08'),
      new Date('2023-06-30'),
      new Date('2023-06-28'),
    ]);
  });
});
