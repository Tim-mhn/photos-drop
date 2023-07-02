import {
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
  UploadFilesUsecase,
} from './upload.use-case';
import { GetAllImagesUseCase, UserImages } from './get-all-images.use-case';
import { getCurrentUserId } from '../auth';
import { UserImagesDTO } from '@shared';

@Controller('images')
export class ImagesController {
  constructor(
    private uploadImageUsecase: UploadFilesUsecase,
    private getImagesOfUserUseCase: GetAllImagesUseCase,
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
