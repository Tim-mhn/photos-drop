import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { HttpStatusCode } from 'axios';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import {
  InvalidUploadedFilesType,
  UploadFilesUseCase,
} from './upload.use-case';
import { GetAllImagesUseCase, UserImages } from './get-all-images.use-case';
import { getCurrentUserId } from '../auth';
import { DownloadPhotosDTO, UserImagesDTO } from '@shared';
import { DownloadPhotosUseCase } from './download-photos.use-case';

@Controller('images')
export class ImagesController {
  constructor(
    private uploadImageUsecase: UploadFilesUseCase,
    private getImagesOfUserUseCase: GetAllImagesUseCase,
    private downloadPhotosUsecase: DownloadPhotosUseCase,
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', null))
  async uploadImages(
    @Req() req: Request,
    @Res() res: Response,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const currentUserId = await getCurrentUserId(req);

    try {
      await this.uploadImageUsecase.uploadFiles(currentUserId, files);
    } catch (err) {
      const { code, errorResponse } = buildUploadApiErrorResponse(err);
      return res.status(code).send(errorResponse);
    }
  }

  @Get()
  async getImagesOfUser(
    @Req() req: Request,
  ): Promise<UserImagesDTO | UserImages> {
    const currentUserId = await getCurrentUserId(req);
    return this.getImagesOfUserUseCase.getImagesOfUserGroupedByDate(
      currentUserId,
    );
  }

  @Post('download')
  async downloadPhotos(@Res() res: Response, @Body() body: DownloadPhotosDTO) {
    const photoIds = body.photos;

    const { buffer, filename, filetype } =
      await this.downloadPhotosUsecase.execute(photoIds);

    res.writeHead(200, {
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Type': filetype,
    });
    return res.end(buffer);
  }
}

function buildUploadApiErrorResponse(err: Error): {
  errorResponse: any;
  code: number;
} {
  if (err instanceof InvalidUploadedFilesType) {
    const errorResponse = {
      message: `Some files have an invalid type. Only ${err.supportedTypes.join(
        ', ',
      )} files are supported`,
      error: 'invalid-uploaded-files-type',
      invalidTypes: err.invalidTypes,
    };

    return {
      errorResponse,
      code: HttpStatusCode.BadRequest,
    };
  }

  const internalErrorResponse = {
    message: 'An unexpected error occurred.',
    error: 'internal-error',
  };

  return {
    errorResponse: internalErrorResponse,
    code: HttpStatusCode.InternalServerError,
  };
}
