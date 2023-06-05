import {
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadFilesUsecase } from '../../libs/core/src/usecase';

@Controller('upload')
export class ImageUploadController {
  constructor(private uploadImageUsecase: UploadFilesUsecase) {}
  @Post()
  @UseInterceptors(FilesInterceptor('files', null))
  uploadImages(
    @Req() req: Request,
    @UploadedFiles() _files: Array<Express.Multer.File>,
  ) {
    // console.log(req);
    return this.uploadImageUsecase.uploadFiles(_files);
    //     _files[0].mimetype;

    //     const f = null as any as Bob;

    //     f.lastModified;
    //   }
  }
}
