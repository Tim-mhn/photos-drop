import { InvalidUploadedFilesType } from '../upload.use-case';
import { UploadImagesTestFixture } from './test.fixture';

describe('upload images', () => {
  const retrieveImageDate = jest.fn();

  let testFixture: UploadImagesTestFixture;

  beforeEach(() => {
    testFixture = new UploadImagesTestFixture();

    retrieveImageDate.mockImplementation(() => Date.now());
  });
  it('should successfully upload some images', async () => {
    testFixture.givenFiles([{ type: 'image/jpeg' }, { type: 'image/png' }]);

    await testFixture.whenUploading();

    expect(testFixture.uploadRepo.uploadToStorage).toHaveBeenCalled();
  });

  describe('invalid file types', () => {
    beforeEach(async () => {
      testFixture.givenFiles([
        { type: 'image/bmp' },
        { type: 'image/heif' },
        { type: 'image/bmp' },
        { type: 'text/html' },
      ]);
      await testFixture.whenUploading();
    });

    it('should throw an error if the files are all not jpeg or pngs', async () => {
      expect(testFixture.error).toBeInstanceOf(InvalidUploadedFilesType);
    });

    it('upload error should hold the list of unique invalid types', async () => {
      expect(
        (testFixture.error as InvalidUploadedFilesType).invalidTypes,
      ).toEqual(['image/bmp', 'image/heif', 'text/html']);
    });

    it("should not save user's images if there is an error in the upload", async () => {
      testFixture
        .givenFiles([{ type: 'image/jpeg' }])
        .givenImagesRepositoryWillThrow();

      await testFixture.whenUploading();

      testFixture.thenUserImagesRepoShouldNotBeCalled();
    });
  });

  it('should save the images date', async () => {
    const url = 'https://image1.jpeg';

    testFixture.givenFiles([
      {
        type: 'image/jpeg',
        date: new Date('01/02/2022 09:20:00'),
        url,
      },
    ]);

    await testFixture.whenUploading();

    expect(testFixture.userImagesRepo.saveImagesOfUser).toBeCalledWith(
      expect.anything(),
      [
        {
          url,
          date: new Date('01/02/2022 09:20:00'),
        },
      ],
    );
  });
});
