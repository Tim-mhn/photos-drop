import {
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@Controller('upload')
export class ImageUploadController {
  @Post()
  @UseInterceptors(FilesInterceptor('files', null))
  uploadImages(
    @Req() req: Request,
    @UploadedFiles() _files: Array<Express.Multer.File>,
  ) {
    console.log(req);
    //     _files[0].mimetype;

    //     const f = null as any as Bob;

    //     f.lastModified;
    //   }
  }
}
