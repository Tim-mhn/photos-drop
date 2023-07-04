import { UploadFilesUseCase } from '../upload.use-case';

export class UploadImagesTestFixture {
  userImagesRepo = {
    getImagesOfUser: jest.fn(),
    saveImagesOfUser: jest.fn(),
  };

  uploadRepo = {
    uploadToStorage: jest.fn(),
  };

  retrieveImageDate = jest.fn();
  usecase = new UploadFilesUseCase(
    this.userImagesRepo,
    this.uploadRepo,
    this.retrieveImageDate,
  );
  files: Express.Multer.File[];

  urls: string[];

  givenFiles(filesOpts: { type: string; date?: Date; url?: string }[]) {
    this.files = filesOpts.map(({ type }) => multerFileBuilder(type));
    this.urls = filesOpts.map(
      (opts) => opts?.url || `https://images-s3/${Math.random()}`,
    );

    const imageDates = filesOpts.map((opts) => opts.date || Date.now());

    this.retrieveImageDate.mockImplementation(() => imageDates[0]);
    this.uploadRepo.uploadToStorage.mockImplementation(() => this.urls);
    return this;
  }

  givenUploadRepositoryWillThrow() {
    jest.spyOn(this.uploadRepo, 'uploadToStorage').mockImplementation(() => {
      throw new Error('error in upload');
    });
  }

  error: Error | null;
  async whenUploading() {
    try {
      await this.usecase.uploadFiles('user-1', this.files);
    } catch (err) {
      this.error = err;
    }
  }

  thenUserImagesRepoShouldNotBeCalled() {
    expect(this.userImagesRepo.saveImagesOfUser).not.toHaveBeenCalled();
  }
}

const multerFileBuilder = (mimetype: string) =>
  ({ mimetype } as Express.Multer.File);
