import { ImageRepository } from '../src/upload/image.repository';
import { UploadFilesUsecase } from '../src/upload/upload.use-case';

describe('upload images', () => {
  let usecase: UploadFilesUsecase;
  let repo: ImageRepository;

  beforeEach(() => {
    repo = {
      uploadToStorage: jest.fn(),
    };
    usecase = new UploadFilesUsecase(repo);
  });
  it('should successfully upload some images', async () => {
    const files: Express.Multer.File[] = [
      multerFileBuilder('image/jpeg'),
      multerFileBuilder('image/png'),
    ];

    await usecase.uploadFiles(files);

    expect(repo.uploadToStorage).toHaveBeenCalled();
  });

  it('should throw an error if the files are all not jpeg or pngs', async () => {
    const files: Express.Multer.File[] = [
      multerFileBuilder('image/bmp'),
      multerFileBuilder('image/heif'),
    ];

    const uploadFn = () => usecase.uploadFiles(files);

    expect(uploadFn).rejects.toThrowError();
  });

  it('should throw an error if at least one file has the wrong mimetype', async () => {
    const files: Express.Multer.File[] = [
      multerFileBuilder('image/jpeg'),
      multerFileBuilder('image/heif'),
      multerFileBuilder('image/png'),
    ];

    const uploadFn = () => usecase.uploadFiles(files);

    expect(uploadFn).rejects.toThrowError();
  });
});

const multerFileBuilder = (mimetype: string) =>
  ({ mimetype } as Express.Multer.File);
