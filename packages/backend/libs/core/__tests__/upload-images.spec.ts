import {
  UploadRepository,
  UserImagesRepository,
} from '../src/images/image.repository';
import { UploadFilesUsecase } from '../src/images/upload.use-case';

describe('upload images', () => {
  let usecase: UploadFilesUsecase;
  let userImagesRepo: UserImagesRepository;
  let uploadRepo: UploadRepository;
  beforeEach(() => {
    uploadRepo = {
      uploadToStorage: jest.fn(),
    };

    userImagesRepo = {
      getImagesOfUser: jest.fn(),
      saveImagesOfUser: jest.fn(),
    };
    usecase = new UploadFilesUsecase(userImagesRepo, uploadRepo);
  });
  it('should successfully upload some images', async () => {
    const files: Express.Multer.File[] = [
      multerFileBuilder('image/jpeg'),
      multerFileBuilder('image/png'),
    ];

    const userId = 'user-1';

    await usecase.uploadFiles(userId, files);

    expect(uploadRepo.uploadToStorage).toHaveBeenCalled();
  });

  it('should throw an error if the files are all not jpeg or pngs', async () => {
    const files: Express.Multer.File[] = [
      multerFileBuilder('image/bmp'),
      multerFileBuilder('image/heif'),
    ];

    const uploadFn = () => usecase.uploadFiles('user-1', files);

    expect(uploadFn).rejects.toThrowError();
  });

  it('should throw an error if at least one file has the wrong mimetype', async () => {
    const files: Express.Multer.File[] = [
      multerFileBuilder('image/jpeg'),
      multerFileBuilder('image/heif'),
      multerFileBuilder('image/png'),
    ];

    const uploadFn = () => usecase.uploadFiles('user-1', files);

    expect(uploadFn).rejects.toThrowError();
  });

  it("should not save user's images if there is an error in the upload", async () => {
    jest.spyOn(uploadRepo, 'uploadToStorage').mockImplementation(() => {
      throw new Error('error in upload');
    });

    const files: Express.Multer.File[] = [
      multerFileBuilder('image/jpeg'),
      multerFileBuilder('image/heif'),
      multerFileBuilder('image/png'),
    ];

    try {
      await usecase.uploadFiles('user-1', files);
    } catch (err) {}

    expect(userImagesRepo.saveImagesOfUser).not.toHaveBeenCalled();
  });
});

const multerFileBuilder = (mimetype: string) =>
  ({ mimetype } as Express.Multer.File);
